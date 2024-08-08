import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import Tooltip from '../../../../components/common/Tooltip';
import appleShatterGif from '../../../../assets/animations/apple_shatter.gif';
import AppleLogo from '../../../../assets/images/Apple_logo_black.svg';
import UberLogo from '../../../../assets/images/Uber_logo_2018.svg';
import WalmartLogo from '../../../../assets/images/Walmart_logo.svg';
import OracleLogo from '../../../../assets/images/Oracle_logo.svg';
import DellLogo from '../../../../assets/images/Dell_logo_2016.svg';
import VolkswagenLogo from '../../../../assets/images/Volkswagen_logo_2019.svg';
import AmericanExpressLogo from '../../../../assets/images/American_Express_logo.svg';
import BoeingLogo from '../../../../assets/images/Boeing_full_logo.svg';
import GoldmanSachsLogo from '../../../../assets/images/Goldman_Sachs_logo.svg';
import DisneyLogo from '../../../../assets/images/Disney_wordmark.svg';
import IBMLogo from '../../../../assets/images/IBM_logo.svg';
import AdidasLogo from '../../../../assets/images/Adidas_Logo.svg';
import CocaColaLogo from '../../../../assets/images/Coca-Cola_logo.svg';
import VisaLogo from '../../../../assets/images/Visa_2021.svg';
import ToyotaLogo from '../../../../assets/images/Toyota_logo.svg';
import NetflixLogo from '../../../../assets/images/Netflix_2015_logo.svg';
import FacebookLogo from '../../../../assets/images/Facebook_Logo_(2019).svg';
import MicrosoftLogo from '../../../../assets/images/Microsoft_logo.svg';
import GoogleLogo from '../../../../assets/images/Google_2015_logo.svg';
import AmazonLogo from '../../../../assets/images/amazon_logo.png';
import TeslaLogo from '../../../../assets/images/Tesla_logo.png';
import NikeLogo from '../../../../assets/images/nike_logo.png';
import ShellLogo from '../../../../assets/images/shell-logo.png';
import NvidiaLogo from '../../../../assets/images/nvidia logo.png';
import AppleLogo2 from '../../../../assets/images/apple-logo-blackandwhite.svg';
import ApplePark from '../../../../assets/animations/apple park to steves.gif';
import { SymbolInfo } from 'react-ts-tradingview-widgets';
import { motion } from 'framer-motion';
import CompanyPopup from './CompanyPopup';
import SellPopup from './SellPopup';

const companyLogos = [
  { logo: AppleLogo, symbol: "NASDAQ:AAPL", name: "Apple" },
  { logo: UberLogo, symbol: "NYSE:UBER", name: "Uber" },
  { logo: WalmartLogo, symbol: "NYSE:WMT", name: "Walmart" },
  { logo: OracleLogo, symbol: "NYSE:ORCL", name: "Oracle" },
  { logo: DellLogo, symbol: "NYSE:DELL", name: "Dell Technologies" },
  { logo: VolkswagenLogo, symbol: "OTC:VWAGY", name: "Volkswagen" },
  { logo: AmericanExpressLogo, symbol: "NYSE:AXP", name: "American Express" },
  { logo: BoeingLogo, symbol: "NYSE:BA", name: "Boeing" },
  { logo: GoldmanSachsLogo, symbol: "NYSE:GS", name: "Goldman Sachs" },
  { logo: DisneyLogo, symbol: "NYSE:DIS", name: "Disney" },
  { logo: IBMLogo, symbol: "NYSE:IBM", name: "IBM" },
  { logo: AdidasLogo, symbol: "OTC:ADDYY", name: "Adidas" },
  { logo: CocaColaLogo, symbol: "NYSE:KO", name: "Coca-Cola" },
  { logo: VisaLogo, symbol: "NYSE:V", name: "Visa" },
  { logo: ToyotaLogo, symbol: "NYSE:TM", name: "Toyota" },
  { logo: NetflixLogo, symbol: "NASDAQ:NFLX", name: "Netflix" },
  { logo: FacebookLogo, symbol: "NASDAQ:META", name: "Meta (Facebook)" },
  { logo: MicrosoftLogo, symbol: "NASDAQ:MSFT", name: "Microsoft" },
  { logo: GoogleLogo, symbol: "NASDAQ:GOOGL", name: "Alphabet (Google)" },
  { logo: AmazonLogo, symbol: "NASDAQ:AMZN", name: "Amazon" },
  { logo: TeslaLogo, symbol: "NASDAQ:TSLA", name: "Tesla" },
  { logo: NikeLogo, symbol: "NYSE:NKE", name: "Nike" },
  { logo: ShellLogo, symbol: "NYSE:SHEL", name: "Shell" },
  { logo: NvidiaLogo, symbol: "NASDAQ:NVDA", name: "Nvidia" }
];

const CompanyLogo = ({ logo, companySymbol, companyName, index, onPurchaseComplete }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 150,
          damping: 20,
          delay: index * 0.1 
        }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        onClick={() => setShowPopup(true)}
        className="cursor-pointer flex items-center justify-center"
      >
        <motion.img 
          src={logo} 
          alt={`${companyName} logo`} 
          className="w-24 h-24 object-contain"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      {showPopup && (
        <CompanyPopup 
          companySymbol={companySymbol} 
          companyName={companyName} 
          onClose={() => setShowPopup(false)}
          onPurchaseComplete={onPurchaseComplete}
        />
      )}
    </>
  );
};

const SubLevelALesson1 = ({ user }) => {
    const [step, setStep] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [purchasedCompany, setPurchasedCompany] = useState(null);
    const [showSellInterface, setShowSellInterface] = useState(false);
    const [isSellComplete, setIsSellComplete] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      if (location.state && location.state.goToEnd) {
        setStep(content.length - 1);
      }
    }, [location]);
  
    const handlePurchaseComplete = (companyName, companySymbol) => {
      setPurchasedCompany({ name: companyName, symbol: companySymbol, originalPrice: 100 }); 
      setShowSellInterface(true);
    };
  
    const handleStepChange = (newStep) => {
        setStep(newStep);
      };

    const handleSellComplete = () => {
      setIsSellComplete(true);
    };
  
    const handleNext = (newStep) => {
      if (step < content.length - 1) {
        setStep(newStep);
      }
    };
  
    const handlePrevious = (newStep) => {
      if (step > 0) {
        setStep(newStep);
      }
    };
  
    if (!user) {
      return <div></div>; // Render a loading state while fetching user data
    }
  
    const isContinueDisabled = (step === 3 && !purchasedCompany) || (step === 5 && !isSellComplete);
  
    const renderInstructions = () => {
      if (step === 3) {
        if (!purchasedCompany) {
          return (
            <p className="mt-4 text-center text-lg font-semibold">
              Let's try it out! Pick a company to buy stock in.
            </p>
          );
        } else {
          return (
            <p className="mt-4 text-center text-lg text-gs-dark-green font-semibold">
              Great job! You've purchased your first stock in {purchasedCompany.name}. Click 'Continue' to proceed with the lesson.
            </p>
          );
        }
      } else if (step === 5) {
        return (
          <p className="mt-4 text-center text-lg font-semibold">
            Sell your share of {purchasedCompany.name} to complete this part of the lesson.
          </p>
        );
      }
      return null;
    };

  const content = [
    <>
      <p>
        So, you want to know what the stock market is? That's a complicated ask, so let's start with the basics.
      </p>
      <p>
        To understand what the stock market is, we must understand what is meant by a <Tooltip term="public company" definition="A company that anyone can buy a piece of" />. Let's take a look at Apple.
      </p>
    </>,
    <>
      <p>
        Apple's CEO is Tim Cook, but he doesn't actually own the whole company. In fact, Apple isn't even owned by a single parent company, or a group of 5, 10, or even 20 people. It's owned by tens of thousands.
      </p>
      <div className="size-[128] mx-auto my-4">
        <img src={appleShatterGif} alt="Apple logo shattering" />
      </div>
    </>,
    <>
      <p className="mb-8">
        When people refer to a <Tooltip term="stock" definition="All of the shares of a company collectively" />, they're talking about all of the shares of a company collectively.
      </p>
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-gray-400 text-white rounded-2xl px-8 py-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-700">
          <img src={AppleLogo2} alt="Apple logo" className="rounded-full w-20 h-20 mr-6" />
          <div className="flex flex-col">
            <span className="font-mono text-4xl font-bold tracking-wider">AAPL</span>
          </div>
        </div>
      </div>
      <p className="mt-8 font-light text-lg">
        Fun Fact: When people talk about any stock, they usually don't refer to it by its company name. Instead, they use an all-caps special abbreviation called a <Tooltip term="ticker" definition="A unique abbreviation used to identify a stock" />.
      </p>
    </>,
    <>
      <p className="mb-4">
        The stock market as a whole is essentially just a platform where traders buy and sell shares of stock in various companies.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 p-4 bg-gray-100 rounded-xl">
        {companyLogos.map((company, index) => (
          <CompanyLogo
            key={company.symbol}
            logo={company.logo}
            companySymbol={company.symbol}
            companyName={company.name}
            index={index}
            onPurchaseComplete={handlePurchaseComplete}
          />
        ))}
      </div>
    </>,
    <>
    <p>
      But...you might be thinking...why would you ever want to be? And why would the founders of any company give away so much of their ownership? Let’s come back to Apple to help us understand.
    </p>
    <p>
      Once upon a time, Apple was just owned by a couple of people, making them a private company.
    </p>
    <div className="flex justify-center my-4">
      <img src={ApplePark} alt="Apple Park GIF" className="rounded-xl shadow-lg" />
    </div>
    <p>
      Their idea was powerful and their company was beginning to be successful, but they had no money. If they ever wanted to grow Apple further, they needed to raise some funds.
    </p>
    <p>
      One way any company can do this is by going public and issuing stock. This allows anyone to buy a stake in the company, from the wealthiest of investment banks to the...well, to you.
    </p>
  </>,  
    <>
      <p className="mb-4">
        When someone buys stock in a company, the company is able to use the money that person pays to fund their operations.
      </p>
      <p className="mb-4">
        In return, as time passes, the value of the stock increases or decreases depending on the company's level of success, allowing the user to make (or lose) money.
      </p>
      {showSellInterface && purchasedCompany && (
        <>
          <p className="mb-4">
            Let's check up on your share of {purchasedCompany.name} and see how its value has changed since you bought it.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SellPopup
              companySymbol={purchasedCompany.symbol}
              companyName={purchasedCompany.name}
              onSellComplete={handleSellComplete}
            />
          </motion.div>
        </>
      )}
    </>,
    <>
      <p>
        Congratulations! Welcome to the stock market.
      </p>
    </>
  ];

  return (
    <ModuleTemplate 
      title="Getting Started" 
      lessonId="1a1"
      userId={user.id}
      onNext={handleNext}
      onPrevious={handlePrevious}
      totalSteps={content.length}
      currentStep={step + 1}
      isContinueDisabled={isContinueDisabled}
      nextLessonPath="/level-1/a/quiz-1"
      previousLessonPath="/"
      onStepChange={handleStepChange} // Add this prop
    >
      {content.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {renderInstructions()}
    </ModuleTemplate>
  );
};

export default SubLevelALesson1;
