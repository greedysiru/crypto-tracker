import styled from "styled-components";

interface PriceProps {
  priceInfo: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const PriceInfoList = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 10px;
  span {
    margin-bottom: 10px;
    text-align: left;
  }
`;

function Price({ priceInfo }: PriceProps) {
  const priceInfoLabels = Object.keys(priceInfo);
  const priceInfoItem = Object.values(priceInfo);
  return (
    <Container>
      <PriceInfoList>
        {priceInfoLabels.map((label) => (
          <span>{label}</span>
        ))}
      </PriceInfoList>
      <PriceInfoList>
        {priceInfoItem.map((item) => (
          <span>{item}</span>
        ))}
      </PriceInfoList>
    </Container>
  );
}

export default Price;
