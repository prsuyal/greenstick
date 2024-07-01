import React from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";
import { Helmet } from 'react-helmet';

const TermsOfUsePage = () => {
  const navigate = useNavigate();

  const termsData = [
    {
      section: "Introduction",
      content: `
        Our aim is to keep this Agreement as readable as possible, but in some cases for legal reasons, some of the language is required "legalese".
      `,
    },
    {
      section: "Your Acceptance of this Agreement",
      content: `
        These terms of service are entered into by and between You and GREENSTICK LLC ("Company," "we," "our," or "us"). The following terms and conditions, together with any documents they expressly incorporate by reference (collectively "Terms of Service"), govern your access to and use of greenstickusa.com, including any content, functionality, and services offered on or through greenstickusa.com (the "Website"), whether as a guest or a registered user. We offer the following service that is subject to these Terms of Service: Greenstick (collectively "Services").

Please read the Terms of Service carefully before you start to use the Website. By using the Website [or by clicking to accept or agree to the Terms of Service when this option is made available to you], you accept and agree to be bound and abide by these Terms of Service and our Privacy Policy, incorporated herein by reference. If you do not want to agree to these Terms of Service, you must not access or use the Website.

You must be at least 13 years old to use this Website. However, children of all ages may use the Website if enabled by a parent or legal guardian. If you are under 18, you represent that you have your parent or guardian's permission to use the Website. Please have them read these Terms of Service with you.

If you are a parent or legal guardian of a user under the age of 18, by allowing your child to use the Website, you are subject to the terms of these Terms of Service and responsible for your child's activity on the Website.

BY ACCESSING AND USING THIS WEBSITE, YOU: ACCEPT AND AGREE TO BE BOUND AND COMPLY WITH THESE TERMS OF SERVICE; YOU REPRESENT AND WARRANT THAT YOU ARE THE LEGAL AGE OF MAJORITY UNDER APPLICABLE LAW TO FORM A BINDING CONTRACT WITH US; AND, YOU AGREE IF YOU ACCESS THE WEBSITE FROM A JURISDICTION WHERE IT IS NOT PERMITTED, YOU DO SO AT YOUR OWN RISK.
      `,
    },
    {
      section: "Updates to Terms of Service",
      content: `
        We may revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Website thereafter. Continuing to use the Website following the posting of revised Terms of Service means that you accept and agree to the changes. You are expected to check this page each time you access this Website so you are aware of any changes, as they are binding on you.
      `,
    },
    {
      section: "Your Responsibilities",
      content: `
        You are required to ensure that all persons who access the Website are aware of this Agreement and comply with it. The Website, including content or areas of the Website, may require user registration. It is a condition of your use of the Website that all the information you provide on the Website is correct, current, and complete. Any username, password, or any other piece of information chosen by you, or provided to you as part of our security procedures, must be treated as confidential, and you must not disclose it to any other person or entity. You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security. You also agree to ensure that you log out from your account at the end of each session. You are responsible for any password misuse or any unauthorized access. YOU ARE SOLELY AND ENTIRELY RESPONSIBLE FOR YOUR USE OF THE WEBSITE AND YOUR COMPUTER, INTERNET AND DATA SECURITY.
      `,
    },
    {
      section: "Prohibited Activities",
      content: `
        You may use the Website only for lawful purposes and in accordance with these Terms of Service. You agree not to use the Website: 
  ● In any way that violates any applicable federal, state, local or international law or regulation (including, without limitation, any laws regarding the exports of data software to and from the U.S. or other countries). 
  ● For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information or otherwise.
  ● To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the Submission Standards set out in these Terms of Service.
  ● To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.
  ● To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other persona or entity (including, without limitation, by using email addresses associated with any of the foregoing).
  ● To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which as determined by us, may harm the Company or users of the website, or expose them to liability.
      `,
    },
    {
      section: "Intellectual Property Rights",
      content: `
        The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

These Terms of Service permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as follows:
  ● Your computer may temporarily store copies of such material in RAM incidental to your accessing and viewing those materials.
  ● You may store files that are automatically cached by your Web browser for display enhancement purposes.
  ● You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication or distribution.
        
You must not: 
  ● Modify copies of any materials from this site.
  ● Delete or alter any of the copyright, trademark, or other proprietary rights notices from copies of materials from this site.
  ● Access or use for any commercial purposes any part of the website or any services or materials available through the Website.
      `,
    },
    {
      section: "User Submissions and Submission Standards",
      content: `
        The Website may provide you with the opportunity to create, submit, post, display, transmit, public, distribute, or broadcast content and materials to us or in the Website, including but not limited to text, writings, video, audio, photographs, graphics, comments, ratings, reviews, feedback, or personal information or other material (collectively, "Content"). You are responsible for your use of the Website and for any content you provide, including compliance with applicable laws, rules, and regulations.

All User Submissions must comply with the Submission Standards and Prohibited Activities set out in these Terms of Service.

Any User Submissions you post to the Website will be considered non-confidential and non-proprietary. By submitting, posting, or displaying content on or through the Website, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, disclose, adapt, modify, publish, transmit, display and distribute such Content for any purpose, commercial advertising, or otherwise, and to prepare derivative works of, or incorporate in other works, such as Content, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media format and through any media channels.

You represent and warrant that: 
  ● You own or control all rights in and to the User Submissions and have the right to grant the license granted above to us and our affiliates and service providers, and each of their and our respective licensees, successors, and assigns.
  ● All of your User Submissions comply with these Terms of Service.
      `,
    },
    {
      section: "Our Rights",
      content: `
        We have the right, without provision of notice to:
  ● Remove or refuse to post any User Submission for any or no reason in our sole discretion.
  ● Take any action with respect to any User Submission that we deem necessary or appropriate in our sole discretion, including if we believe that such User Submission violates the Terms of Service, including the Submission Standards, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Website or the public, or could create liability for the Company.
  ● Take appropriate legal action, including, without limitation, referral to or cooperation with law enforcement or regulatory authorities, or notifying the harmed party of any illegal or unauthorized use of the Website.
  ● Terminate or suspend your access to all or part of the Website for any or no reason, including, without limitation, any violation of these Terms of Service.

YOU WAIVE AND HOLD HARMLESS COMPANY AND ITS PARENT, SUBSIDIARIES, AFFILIATES, AND THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, AND SUCCESSORS FROM ANY AND ALL CLAIMS RESULTING FROM ANY ACTION TAKEN BY THE COMPANY AND ANY OF THE FOREGOING PARTIES RELATING TO ANY INVESTIGATIONS BY EITHER THE COMPANY OR BY LAW ENFORCEMENT AUTHORITIES.
      `,
    },
    {
      section: "Third-Party Links and Content",
      content: `
        For your convenience, this Website may provide links or pointers to third-party sites or third-party content. We make no representations about any other websites or third-party content that may be accessed from this Website. If you choose to access any such sites, you do so at your own risk. We have no control over the third-party content or any such third-party sites and accept no responsibility for such sites or for any loss or damage that may arise from your use of them. You are subject to any terms and conditions of such third-party sites.
      `,
    },
    {
      section: "Payment and Fees",
      content: `
        You may be required to purchase or pay a fee to access our services. We accept Stripe, Visa, Mastercard, and American Express for all purchases. However, Company does not guarantee the availability of any payment method at any moment and Company may add, remove or suspend any payment method temporarily or permanently at Company's sole discretion. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Website and to promptly update account and payment information, including email address, payment method, and payment card expiration date, in order to complete your purchases and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We reserve the right to change prices at any time. All payments shall be in USD.

You agree to pay all charges or fees at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such amounts upon making your purchase.

If your purchase is subject to recurring charges, you must keep a valid payment method on file with Company to pay for all incurred and recurring fees. Company will charge applicable fees to any valid payment method that you have provided and you will be invoiced automatically as outlined in the order. You authorize such payment of recurring fees without requiring your prior approval for each recurring charge, until you notify us of your cancellation, or the Company terminates in writing in accordance with these Terms of Service, or until the recurring contract ends, and any and all outstanding fees and charges have been paid in full.

We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment. We also reserve the right to refuse any order placed through the Website. All charges are final and nonrefundable except at the sole discretion of the Company.

From time to time, Company may offer a limited free trial and/or promotional codes for a specified period, which may be subject to additional terms. We have sole discretion to determine your eligibility for trials and/or promotional codes. If you are required to provide payment information in connection with your trial, your first payment will be charged to your chosen payment method following the expiration of the trial, unless earlier terminated in accordance with these Terms of Service. You may not receive a separate notice that your free trial is about to end or has ended, or that your paid subscription has begun.
      `,
    },
    {
      section: "Cancellation",
      content: `
        You can cancel your subscription at any time by logging into your account or contacting us using the contact information provided below. Your cancellation will take effect at the end of the current billing period.

Subscription purchases are non-refundable, have no monetary value (for example, they are not a cash account or equivalent), and are purchases of only a non-exclusive, revocable, non-assignable and non-transferable right to use the subscription.

You may not transfer, sell, purchase, barter, or trade your subscriptions or attempt or offer to do so. Any attempted transfer will be null and void. Except as required by applicable law, we are not responsible for any refunds or credits in connection with any modified, suspended or terminated subscriptions.
      `,
    },
    {
      section: "Disclaimers, Liability and Indemnification",
      content: `
        The content contained on the Website is for informational and educational purposes only. You should not construe any information found on the Website as investment, financial, legal, or other professional advice. Nothing contained on the Website constitutes a solicitation, recommendation, endorsement, or offer by the Company or any third-party service provider to buy or sell any securities or other financial instruments in this or in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.

All content on the Website is of a general nature and does not address the circumstances of any particular individual or entity. The content provided is designed to enhance your understanding of financial markets, but it is not intended to be a substitute for professional advice. Nothing in the Website constitutes professional and/or financial advice, and there is no assurance or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.

You should consult with a qualified financial advisor or other professional to determine what may be best for your individual needs. The Company does not endorse or recommend any specific financial products, investments, or strategies.

Under no circumstance shall the Company have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the Website is solely at your own risk.

The Website may include links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Website or any website or feature linked in any banner or other advertising. We will not be a party to or in any way responsible for monitoring any transaction between you and third-party providers of products or services.

All company logos and other trademarks used on this website are the property of their respective owners. The use of these logos is for educational purposes only to facilitate learning about trading and does not imply any affiliation, endorsement, or sponsorship by the respective companies. The Company has no affiliation with these companies, and the logos are used under fair use for educational purposes.

There is no guarantee of any specific outcome or financial result based on the use of the Website or the information contained herein. The results obtained from the use of the Website will vary based on individual circumstances and other factors.

Your use of the Website does not create any fiduciary, advisory, or professional relationship between you and the Company or any of its officers, directors, employees, agents, or affiliates.

YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY GOODS, DIGITAL PRODUCTS, SERVICES, INFORMATION OR ITEMS FOUND OR ATTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY GOODS, SERVICES, DIGITAL PRODUCTS, INFORMATION OR ITEMS FOUND OR ATTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.

YOU ACKNOWLEDGE AND AGREE THAT COMPANY OR ITS RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS MAKE NO WARRANTY, REPRESENTATION, OR ENDORSEMENT WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, SUITABILITY, ACCURACY, CURRENCY, OR AVAILABILITY OF THE WEBSITE OR ITS CONTENTS OR THAT ANY GOODS, SERVICES, DIGITAL PRODUCTS, INFORMATION OR ITEMS FOUND OR ATTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE OR CONTENT ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR DESTRUCTIVE CODE.
      `,
    },
    {
      section: "How We Limit Our Liability to You",
      content: `
        EXCEPT WHERE SUCH EXCLUSIONS ARE PROHIBITED BY LAW, IN NO EVENT SHALL THE COMPANY NOR ITS RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS BE LIABLE UNDER THESE TERMS OF SERVICE TO YOU OR ANY THIRD-PARTY FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES WHATSOEVER, INCLUDING ANY DAMAGES FOR BUSINESS INTERRUPTION, LOSS OF USE, DATA, REVENUE OR PROFIT, COST OF CAPITAL, LOSS OF BUSINESS OPPORTUNITY, LOSS OF GOODWILL, WHETHER ARISING OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), ANY OTHER THEORY OF LIABILITY, OR OTHERWISE, REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE AND WHETHER OR NOT THE COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      `,
    },
    {
      section: "Indemnification",
      content: `
        To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Company, its parent, subsidiaries, affiliates, and their respective directors, officers, employees, agents, service providers, contractors, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your breach of these Terms of Service or your use of the Website including, but not limited to, third-party sites and content, any use of the Website's content and services other than as expressly authorized in these Terms of Service or any use of any goods, digital products and information purchased from this Website.
      `,
    },
    {
      section: "Privacy Policy",
      content: `
        Your provision of personal information through the Website is governed by our privacy policy located at greenstickusa.com/privacy (the "Privacy Policy").
      `,
    },
    {
      section: "Governing Law",
      content: `
        The Website and these Terms of Service will be governed by and construed in accordance with the laws of the State of New Jersey and any applicable federal laws applicable therein, without giving effect to any choice or conflict of law provision, principle, or rule and notwithstanding your domicile, residence, or physical location. Any action or proceeding arising out of or relating to this Website and/or under these Terms of Service will be instituted in the courts of the State of New Jersey, and each party irrevocably submits to the exclusive jurisdiction of such courts in any such action or proceeding. You waive any and all objections to the exercise of jurisdiction over you by such courts and to the venue of such courts.

If you are a citizen of any European Union country or Switzerland, Norway or Iceland, the governing law and forum shall be the laws and courts of your usual place of residence.

The parties agree that the United Nations Convention on Contracts for the International Sale of Goods will not govern these Terms of Service or the rights and obligations of the parties under these Terms of Service.
      `,
    },
    {
      section: "Severability",
      content: `
      If any provision of these Terms of Service is illegal or unenforceable under applicable law, the remainder of the provision will be amended to achieve as closely as possible the effect of the original term and all other provisions of these Terms of Service will continue in full force and effect.
      `,
    },
    {
      section: "Entire Terms of Service",
      content: `
      These Terms of Service constitute the entire and only Terms of Service between the parties in relation to its subject matter and replace and extinguish all prior or simultaneous Terms of Services, undertakings, arrangements, understandings or statements of any nature made by the parties or any of them whether oral or written (and, if written, whether or not in draft form) with respect to such subject matter. Each of the parties acknowledges that they are not relying on any statements, warranties or representations given or made by any of them in relation to the subject matter of these Terms of Service, save those expressly set out in these Terms of Service, and that they shall have no rights or remedies with respect to such subject matter otherwise than under these Terms of Service save to the extent that they arise out of the fraud or fraudulent misrepresentation of another party. No variation of these Terms of Service shall be effective unless it is in writing and signed by or on behalf of Company.
      `,
    },
    {
      section: "Waiver",
      content: `
        No failure to exercise, and no delay in exercising, on the part of either party, any right or any power hereunder shall operate as a waiver thereof, nor shall any single or partial exercise of any right or power hereunder preclude further exercise of that or any other right hereunder.
      `,
    },
    {
      section: "Notice",
      content: `
        We may provide any notice to you under these Terms of Service by: (i) sending a message to the email address you provide to us and consent to us using; or (ii) by posting to the Website. Notices sent by email will be effective when we send the email and notices we provide by posting will be effective upon posting. It is your responsibility to keep your email address current.
      `,
    },
  ];

  return (
    <>
    <Helmet>
        <title>Terms of Use - Greenstick</title>
    </Helmet>
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
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Terms of Use</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Greenstick Terms of Service</h2>
          
          {termsData.map((section, index) => (
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
    </>
  );
};

export default TermsOfUsePage;
