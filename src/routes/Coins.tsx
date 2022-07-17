import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-itmes: center;
`;

const CoinsLilst = styled.ul``;

const Coin = styled.li`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex !important;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const DarkModeToggleButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  transition: color 0.2s ease-in;
  cursor: pointer;
  span {
    vertical-align: sub;
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // fetcher Functino은 Promise를 return해야 함
  // 1. queryKey: query의 고유 식별자
  // 2. Fetcher Function: Promise를 return해야 함
  // isLoading: 로딩 상태를 나타내는 Boolean
  // react Query가 데이터를 캐싱
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // Setter Function: atom을 설정(set)하는 Function
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          {/* 해당 문서의 head로 가게 됨 */}
          <title>코인</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>코인</Title>
        <DarkModeToggleButton onClick={toggleDarkAtom}>
          <span>Toggle Mode</span>
        </DarkModeToggleButton>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsLilst>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  alt="coinImage"
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsLilst>
      )}
    </Container>
  );
}

export default Coins;
