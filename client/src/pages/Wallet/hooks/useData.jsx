import { React, useState, useEffect } from "react";
import axios from "axios";
import { Col, Image, Row } from "react-bootstrap";
import { P, Token } from "../style";

const Eth = () => {
  const [data, setdata] = useState();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/ethereum")
      .then((response) => {
        setdata(response.data);
      });
  }, []);

  console.log(data);
  const imgsrc = data?.image?.small;
  const symbol = data?.symbol;
  const name = data?.id;

  return (
    <>
      <Row>
        <Col lg="5" md="5" sm="5">
          <Token>
            <div>
              <Image src={imgsrc} />
            </div>
            <div>
              <P>{symbol}</P>
              <P>{name}</P>
            </div>
          </Token>
        </Col>
        <Col lg="5" md="5" sm="5"></Col>
        <Col lg="2" md="2" sm="2"></Col>
      </Row>
    </>
  );
};

export default Eth;
