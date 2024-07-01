import React from 'react';
import gsLogoWhite from "../../assets/images/logo-white.svg"; 

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 font-[Poppins]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex justify-start">
                        <a href="/">
                            <img src={gsLogoWhite} alt="GS Logo" className="h-20 md:h-24 cursor-pointer" />
                        </a>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="/pricing" className="hover:text-gs-dark-green">Pricing</a></li>
                            <li><a href="/help" className="hover:text-gs-dark-green">Help</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-gs-dark-green">About</a></li>
                            <li><a href="/contact" className="hover:text-gs-dark-green">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/people/Greenstick-USA/61561274224424/" target="_blank" rel="noopener noreferrer" className="hover:text-gs-dark-green">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/greenstick_official" target="_blank" rel="noopener noreferrer" className="hover:text-gs-dark-green">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-700 text-sm">
                    <div className="flex flex-wrap justify-between">
                        <div className="space-x-4">
                            <a href="/termsofuse" className="hover:text-gs-dark-green">Terms of use</a>
                            <a href="/privacypolicy" className="hover:text-gs-dark-green">Privacy policy</a>
                        </div>
                        <div>
                            © 2024 Greenstick LLC. Greenstick and the Greenstick Logo are trademarks of Greenstick LLC.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
