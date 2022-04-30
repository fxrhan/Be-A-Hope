// src/App.tsx
import React, { ReactNode } from "react";
import { DAppProvider, useConnect } from "./dapp/dapp";
import { APP_NAME, NETWORK } from "./dapp/defaults";
import "./App.css";
import FeatureCard from "./components/FeatureCard";
import Speciality from "./components/Speciality";
import CausesCard from "./components/CausesCard";
import causes from "./assets/causes.png";
import dft1 from "./assets/dft-1.png";
import About from "./components/About";
import Quote from "./components/Quote";
// import Footer from "./components/Footer";

const Page = (props: { children: ReactNode | ReactNode[] }) => {
  return <div className="App"> {props.children} </div>;
};

function ConnexionButton() {
  const connect = useConnect();
  const handleConnect = React.useCallback(async () => {
    try {
      await connect(NETWORK, { forcePermission: true });
    } catch (err) {
      console.error(err);
    }
  }, [connect]);
  return <button onClick={handleConnect}>Connect account</button>;
}

function App() {
  return (
    <DAppProvider appName={APP_NAME}>

      <div className="features">
        <FeatureCard
          icon={"fa-solid fa-hand-holding-heart"}
          name={"fast"}
          text={
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, dolore?"
          }
        />
        <FeatureCard
          icon={"fa-solid fa-hand-holding-heart"}
          name={"fast"}
          text={
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, dolore?"
          }
        />
        <FeatureCard
          icon={"fa-solid fa-hand-holding-heart"}
          name={"fast"}
          text={
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, dolore?"
          }
        />
      </div>


      <div className="causes-container">
        <div className="title-container">
          <div className="main-title">RECENT CAUSES</div>
          <div className="title-des">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
        </div>
        <div className="causes  card-container">
          <CausesCard
            src={causes}
            name={"POOR CHILDREN DONATION"}
            description={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliar sit amet consectetur adipisicing elit. Alias, error."
            }
          />
          <CausesCard
            src={causes}
            name={"POOR CHILDREN DONATION"}
            description={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliar sit amet consectetur adipisicing elit. Alias, error."
            }
          />
          <CausesCard
            src={causes}
            name={"POOR CHILDREN DONATION"}
            description={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliar sit amet consectetur adipisicing elit. Alias, error."
            }
          />
        </div>
      </div>

<div className="speciality spec-container">
<div className="title-container">
          <div className="main-title">
            THE PRIMARY CAPIBILITIES OF spec
          </div>
        </div>
        
      <Speciality />
</div>

<Quote />
<About />

      <React.Suspense fallback={null}>
        <Page>
          <ConnexionButton></ConnexionButton>
        </Page>
      </React.Suspense>
    </DAppProvider>
  );
}

export default App;
