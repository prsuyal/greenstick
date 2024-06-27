import React from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const policyData = [
    {
      section: "Introduction",
      content: `
        At GREENSTICK LLC ("us", "we", "our" or the "Company") we value your privacy and the importance of safeguarding your data. This Privacy Policy (the "Policy") describes our privacy practices for the activities set out below. As per your rights, we inform you how we collect, store, access, and otherwise process information relating to individuals. In this Policy, personal data ("Personal Data") refers to any information that on its own, or in combination with other available information, can identify an individual.

We are committed to protecting your privacy in accordance with the highest level of privacy regulation. As such, we follow the obligations under the below regulations:

    ●  Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and the applicable provincial legislations
    ●  Quebec Law 25
    ●  the EU's General Data Protection Regulation (GDPR)
    ●  Brazil’s Data Protection Legislation (LGPD)
    ●  California's Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA) and California Online Privacy Protection Act (CalOPPA)
    ●  Colorado Privacy Act (CPA)
    ●  Utah Consumer Privacy Act (UCPA)
    ●  Connecticut Data Privacy Act (CTDPA)
    ●  Virginia Consumer Data Protection Act (VCDPA)
    ●  South Africa’s Protection of Personal Information Act (POPIA)

Scope

This policy applies to the GREENSTICK LLC websites, domains, applications, services, and products.

This Policy does not apply to third-party applications, websites, products, services or platforms that may be accessed through (non-GREENSTICK LLC) links that we may provide to you. These sites are owned and operated independently from us, and they have their own separate privacy and data collection practices. Any Personal Data that you provide to these websites will be governed by the third-party’s own privacy policy. We cannot accept liability for the actions or policies of these independent sites, and we are not responsible for the content or privacy practices of such sites.

Processing Activities

This Policy applies when you interact with us by doing any of the following:

    ●  Make use of our application and services as an authorized user
    ●  Visit any of our websites that link to this Privacy Statement
    ●  Receive any communication from us including newsletters, emails, calls, or texts / SMS
      `,
    },
    {
      section: "Personal Data We Collect",
      content: `
What Personal Data We Collect

When you make a purchase, or attempt to make a purchase, we collect the following types of Personal Data:

This includes:

    ●  Account Information such as your name, email address, and password
    ●  Payment Information such as your billing address, phone number, credit card, debit card or other payment method
    ●  Purchase Information specifically if personalized or unique
    ●  Location Data

When you use our products and/or features, we collect the following types of Personal Data:

    ●  Account Information such as your name, email address, and password
    ●  Payment Information such as your billing address, phone number, credit card, debit card or other payment method
    ●  Purchase Information specifically if personalized or unique
    ●  Location Data
    ●  Feedback, such as customer support or product reviews
    ●  Content, such as posts, comments, audio, or documents

We also collect the following Sensitive Personal Data. When collecting this data, we will ensure to get your explicit consent:

    ●  Data from a known child.
      `},
      {
        section: "How We Collect Your Personal Data",
        content: `
We collect Personal Data from the following sources:
  
From You. You may give us your Account Information, Payment Information, Financial Information, Demographic Data, Purchase Information, Content, Feedback, Product Information, by filling in forms, using our products or services, entering information online or by corresponding with us by post, phone, email or otherwise. This includes Personal Data you provide, for example, when you:
  
    ●  Create an account or purchase products on our website;
    ●  Use our products or services;
    ●  Create content through our products or services;
    ●  Express interest in our products or services;
    ●  Downloading software and/or our mobile application;
    ●  Subscribe to our newsletter;
    ●  Complete a voluntary market research survey;
    ●  Contact us with an inquiry or to report a problem (by phone, email, social media, or messaging service);
    ●  When you log in to our website via social media;
  
Automated technologies or interactions: As you interact with our website, we may automatically collect the following types of data (all as described above): Device Data about your equipment, Usage Data about your browsing actions and patterns, and Contact Data where tasks carried out via our website remain uncompleted, such as incomplete orders or abandoned baskets. We collect this data by using cookies, server logs and other similar technologies. Please see our Cookie section (below) for further details.
  
Third parties: We may receive Personal Data about you from various third parties, including:
  
    ●  Account Information and Payment Information from another individual when they purchase a gift for you on our website;
    ●  Device and Usage Data from third parties, including analytics providers such as Google;
    ●  Account Information and Payment Data from social media platforms when you log in to our website using such social media platforms;
    ●  Content from communication services, including email providers and social networks, when you give us permission to access your data on such third-party services or networks;
    ●  Account Information and Payment Data from third parties, including organizations (such as law enforcement agencies), associations and groups, who share data for the purposes of fraud prevention and detection and credit risk reduction; and
    ●  Account Information, Payment Data, and Financial Data from providers of technical, payment and delivery services.
  
If you provide us, or our service providers, with any Personal Data relating to other individuals, you represent that you have the authority to do so and acknowledge that it will be used in accordance with this Policy. If you believe that your Personal Data has been provided to us improperly, or to otherwise exercise your rights relating to your Personal Data, please contact us by using the information set out in the "Contact us" section below.
  
Device and Usage Data
  
When you visit a GREENSTICK LLC website, we automatically collect and store information about your visit using browser cookies (files which are sent by us to your computer), or similar technology. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. The Help Feature on most browsers will provide information on how to accept cookies, disable cookies or to notify you when receiving a new cookie. If you do not accept cookies, you may not be able to use some features of our Service and we recommend that you leave them turned on.
  
We also process information when you use our services and products. This information may include:
  
    ●  Login information
    ●  Time stamps
    ●  Authentication records
    ●  Location information
    ●  Time zone
    ●  Other operational data.
  
Data we collect from third parties
  
We may receive your Personal Data from third parties such as companies subscribing to GREENSTICK LLC services, partners and other sources. This Personal Data is not collected by us but by a third party and is subject to the relevant third party’s own separate privacy and data collection policies. We do not have any control or input on how your Personal Data is handled by third parties. As always, you have the right to review and rectify this information. If you have any questions you should first contact the relevant third party for further information about your Personal Data. Where that third party is unresponsive to your rights, you may contact the Data Protection Officer at GREENSTICK LLC (contact details below).
  
Our websites and services may contain links to other websites, applications and services maintained by third parties. The information practices of such other services, or of social media networks that host our branded social media pages, are governed by third parties’ privacy statements, which you should review to better understand those third parties’ privacy practices.
        `,
      },
      {
        section: "Purpose and Legal Basis for the Processing of Personal Data",
        content: `
We collect and use your Personal Data with your consent to provide, maintain, and develop our products and services and understand how to improve them.
  
These purposes include:
  
    ●  To deliver your product or service
    ●  To fulfill orders including electronic and non-electronic shipment
    ●  Building a Safe and Secure Environment
    ●  To verify or authenticate your identity; and
    ●  Investigate and prevent security incidents such as breaches, attacks and hacks
    ●  Providing, Developing, and Improving our Products and Services
    ●  Deliver, maintain, debug and improve our products and services.
    ●  Enable you to access GREENSTICK LLC services and set up accounts.
    ●  To communicate with you about the Products and Services
  
Where we process your Personal Data to provide a product or service, we do so because it is necessary to perform contractual obligations. All of the above processing is necessary in our legitimate interests to provide products and services and to maintain our relationship with you and to protect our business for example against fraud. Consent will be required to initiate services with you. New consent will be required if any changes are made to the type of data collected. Within our contract, if you fail to provide consent, some services may not be available to you.
        `,
      },
      {
        section: "International Data Transfer and Storage",
        content: `
          Where possible, we store and process data on servers within the general geographical region where you reside (note: this may not be within the country in which you reside). Your Personal Data may also be transferred to, and maintained on, servers residing outside of your state, province, country or other governmental jurisdiction where the data laws may differ from those in your jurisdiction. We will take appropriate steps to ensure that your Personal Data is treated securely and in accordance with this Policy as well as applicable data protection law. More information about these clauses can be found here: https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32021D0914
        `,
      },
      {
        section: "Sharing and Disclosure",
        content: `
We will share your Personal Data with third parties only in the ways set out in this Policy or set out at the point when the Personal Data is collected.
  
We also use Google Analytics to help us understand how our customers use the site. You can read more about how Google uses your Personal Data here: https://www.google.com/intl/en/policies/privacy/
  
You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout?hl=en
  
Legal Requirement
  
We may use or disclose your Personal Data in order to comply with a legal obligation, in connection with a request from a public or government authority, or in connection with court or tribunal proceedings, to prevent loss of life or injury, or to protect our rights or property. Where possible and practical to do so, we will tell you in advance of such disclosure.
  
Service Providers and Other Third Parties
  
We may use a third party service provider, independent contractors, agencies, or consultants to deliver and help us improve our products and services. We may share your Personal Data with marketing agencies, database service providers, backup and disaster recovery service providers, email service providers and others but only to maintain and improve our products and services. For further information on the recipients of your Personal Data, please contact us by using the information in the "Contacting us" section below.
        `,
      },
      {
        section: "Cookies",
        content: `
What are Cookies?
  
A cookie is a small file with information that your browser stores on your device. Information in this file is typically shared with the owner of the site in addition to potential partners and third parties to that business. The collection of this information may be used in the function of the site and/or to improve your experience.
  
How we use cookies
  
    ●  To give you the best experience possible, we use the following types of cookies:
    ●  Strictly Necessary. As a web application, we require certain necessary cookies to run our service.
    ●  Preference. We use preference cookies to help us remember the way you like to use our service.
        `,
      },
      {
        section: "Retention & Deletion",
        content: `
          We will only retain your Personal Data for as long as necessary for the purpose for which that data was collected and to the extent required by applicable law. When we no longer need Personal Data, we will remove it from our systems and/or take steps to anonymize it.
        `,
      },
      {
        section: "Merger or Acquisition",
        content: `
          If we are involved in a merger, acquisition or asset sale, your personal information may be transferred. We will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy. Under certain circumstances, we may be required to disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
        `,
      },
      {
        section: "How We Keep Your Data Safe",
        content: `
          We have appropriate organizational safeguards and security measures in place to protect your Personal Data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
  
The communication between your browser and our website uses a secure encrypted connection wherever your Personal Data is involved.
  
We require any third party who is contracted to process your Personal Data on our behalf to have security measures in place to protect your data and to treat such data in accordance with the law.
  
In the unfortunate event of a Personal Data breach, we will notify you and any applicable regulator when we are legally required to do so.
        `,
      },
      {
        section: "Children's Privacy",
        content: `
          We do not knowingly collect Personal Data from children under the age of 13 Years
        `,
      },
      {
        section: "Your Rights for Your Personal Data",
        content: `
Depending on your geographical location and citizenship, your rights are subject to local data privacy regulations. These rights may include:
  
    ●  Right to Access (PIPEDA, GDPR Article 15, CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA, LGPD, POPIA)
    You have the right to learn whether we are processing your Personal Data and to request a copy of the Personal Data we are processing about you.
  
    ●  Right to Rectification (PIPEDA, GDPR Article 16, CPRA, CPA, VCDPA, CTDPA, LGPD, POPIA)
    You have the right to have incomplete or inaccurate Personal Data that we process about you rectified.
  
    ●  Right to be Forgotten (right to erasure) (GDPR Article 17, CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA, LGPD, POPIA)
    You have the right to request that we delete Personal Data that we process about you, unless we need to retain such data in order to comply with a legal obligation or to establish, exercise or defend legal claims.
  
    ●  Right to Restriction of Processing (GDPR Article 18, LGPD)
    You have the right to restrict our processing of your Personal Data under certain circumstances. In this case, we will not process your Data for any purpose other than storing it.
  
    ●  Right to Portability (PIPEDA, GDPR Article 20, LGPD)
    You have the right to obtain Personal Data we hold about you, in a structured, electronic format, and to transmit such Personal Data to another data controller, where this is (a) Personal Data which you have provided to us, and (b) if we are processing that data on the basis of your consent or to perform a contract with you or the third party that subscribes to services.
  
    ●  Right to Opt Out (CPRA, CPA, VCDPA, CTDPA, UCPA)
    You have the right to opt out of the processing of your Personal Data for purposes of: (1) Targeted advertising; (2) The sale of Personal Data; and/or (3) Profiling in furtherance of decisions that produce legal or similarly significant effects concerning you. Under CPRA, you have the right to opt out of the sharing of your Personal Data to third parties and our use and disclosure of your Sensitive Personal Data to uses necessary to provide the products and services reasonably expected by you.
  
    ●  Right to Objection (GDPR Article 21, LGPD, POPIA)
    Where the legal justification for our processing of your Personal Data is our legitimate interest, you have the right to object to such processing on grounds relating to your particular situation. We will abide by your request unless we have compelling legitimate grounds for processing which override your interests and rights, or if we need to continue to process the Personal Data for the establishment, exercise or defense of a legal claim.
  
    ●  Nondiscrimination and nonretaliation (CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA)
    You have the right not to be denied service or have an altered experience for exercising your rights.
  
    ●  File an Appeal (CPA, VCDPA, CTDPA)
    You have the right to file an appeal based on our response to you exercising any of these rights. In the event you disagree with how we resolved the appeal, you have the right to contact the attorney general located here:
    If you are based in Colorado, please visit this website to file a complaint.
    If you are based in Virginia, please visit this website to file a complaint.
    If you are based in Connecticut, please visit this website to file a complaint.
  
    ●  File a Complaint (GDPR Article 77, LGPD, POPIA)
    You have the right to bring a claim before their competent data protection authority. If you are based in the EEA, please visit this website (https://edpb.europa.eu/about-edpb/about-edpb/members_en) for a list of local data protection authorities.
  
Withdrawing Consent
  
If you have consented to our processing of your Personal Data, you have the right to withdraw your consent at any time, free of charge, such as where you wish to opt out from marketing messages that you receive from us. If you wish to withdraw your consent, please contact us using the information found at the bottom of this page.
  
How to Exercise Your Rights
  
You can make a request to exercise any of these rights in relation to your Personal Data by sending the request to our privacy team by using the form below. For your own privacy and security, at our discretion, we may require you to prove your identity before providing the requested information.
        `,
      },
      {
        section: "Changes",
        content: `
We may modify this Policy at any time. If we make changes to this Policy then we will post an updated version of this Policy at this website. When using our services, you will be asked to review and accept our Privacy Policy. In this manner, we may record your acceptance and notify you of any future changes to this Policy.
        `,
      },
      {
        section: "Contact Us",
        content: `
To request a copy for your information, unsubscribe from our email list, request for your data to be deleted, or ask a question about your data privacy, we've made the process simple:
  
To contact us, please email support@greenstickusa.com.
        `,
      },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src={gsLogoBlack}
            alt="Greenstick logo"
            className="h-8 sm:h-10 md:h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="bg-black border-2 border-black text-white font-bold py-1 px-2 sm:px-3 sm:py-2 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Privacy Policy</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Greenstick Privacy Policy</h2>
          
          {policyData.map((section, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-[Poppins] font-medium text-gray-900 mb-6">{section.section}</h3>
              <p className="text-lg sm:text-xl font-[Poppins] text-gray-800 whitespace-pre-wrap">
                {section.content.trim()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
