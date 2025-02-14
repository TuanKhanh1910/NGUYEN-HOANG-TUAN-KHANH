import { Form, InputNumber, Select, Button, Spin, message, Row, Col } from "antd";
import { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
export const CurrencySwapForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState();


  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://interview.switcheo.com/prices.json"
        );
        const data = response.data;
        setCurrencies(data);

      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchRates();
  }, []);

  const dataOption = useMemo(() => {
    const uniqueCurrencies = Array.from(new Set(currencies.map(cur => cur.price)));
    return uniqueCurrencies.map((price) => {
      const cur = currencies.find(c => c.price === price);
      return {
        label: cur.currency,
        value: price,
      };
    });
  }, [currencies])


  const handleSwap = (values) => {
    setLoading(true);
    setTimeout(() => {
      const { amount, fromCurrency, toCurrency } = values;
      const exchangeRate = toCurrency / fromCurrency;
      const convertedAmount = (amount * exchangeRate).toFixed(4);
      setResult(convertedAmount);

      setLoading(false);
    }, 1500);
  };

  return <Fragment>
    <h1 style={{ textAlign: "center" }}>Quản lý đơn vị chuyển đổi tiền tệ</h1>
    <Form form={form} layout="vertical" onFinish={handleSwap}>
      <Form.Item
        name="amount"
        label="Số tiền cần hoán đổi"
        rules={[{ required: true, message: "Vui lòng nhập số tiền cần hoán đổi!" }]}
      >
        <InputNumber min={0.01} style={{ width: "100%" }} parser={value => value.replace(/\./g, '')} placeholder="Nhập số tiền" formatter={value => value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''} />
      </Form.Item>


      <Form.Item
        name="fromCurrency"
        label="Từ tiền tệ"
        rules={[{ required: true, message: "Chọn tiền tệ gốc!" }]}
      >
        <Select placeholder="Chọn loại tiền" loading={!currencies.length} options={dataOption}>
        </Select>
      </Form.Item>


      <Form.Item
        name="toCurrency"
        label="Sang tiền tệ"
        rules={[{ required: true, message: "Chọn tiền tệ muốn đổi!" }]}
      >
        <Select placeholder="Chọn loại tiền" loading={!currencies.length} options={dataOption}>
        </Select>
      </Form.Item>

      <Row justify="center" align="middle" gutter={[20, 20]}>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? <Spin /> : "Swap"}
            </Button>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Button danger onClick={() => form.resetFields()}>
              Hủy
            </Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
    <p style={{ color: "#333", textAlign: "left" }}>Thành tiền: {result}</p>
  </Fragment>;
};
