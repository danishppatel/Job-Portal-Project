import React from "react";
import { AiOutlineHome ,} from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return ( 
    <>
       <section className="relative z-10 overflow-hidden bg-[#FAFAFA] py-10 dark:bg-dark lg:py-[50px]">

       <div className="border-2 border-solid border-black ml-10 mr-10 mb-14">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.362462231369!2d72.87983667508094!3d22.677546979417187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b3c654679bd%3A0x7fec0936b8b30f97!2sBlossom%20Aura!5e0!3m2!1sen!2sin!4v1704974650668!5m2!1sen!2sin" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
       </div>


        <div className="container">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 lg:ml-12 mb-8 lg:mb-0">
              <div className="max-w-[570px] mx-auto">
                <h2 className="mb-6 text-[32px] ml-4 font-bold  text-dark dark:text-gray-200 sm:text-[40px] lg:text-[36px] xl:text-[40px] ">
                  Contact Us
                </h2>
                <p className="mb-6 ml-4 mr-4 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Want to get in touch? We'd love to hear from you. Here's how you can reach us.
                </p>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 ml-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <AiOutlineHome style={{ height: '30px', width: '30px', color: 'blue' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      702-Caspia Bloosam Aura Residency, DDIT Road, Nadiad
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 ml-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <FiPhoneCall  style={{ height: '30px', width: '30px', color: 'blue' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                       (+91) 81414 25798
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 ml-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <MdOutlineMail style={{ height: '30px', width: '30px', color: 'blue' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      info@yourdomain.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg bg-white p-6 sm:p-8 shadow-lg dark:bg-dark-2 border-spacing-1">
                <form>
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder="Your Name"
                  />
                  <ContactInputBox
                    type="text"
                    name="email"
                    placeholder="Your Email"
                  />
                  <ContactInputBox
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                  />
                  <ContactTextArea
                    rows="6"
                    placeholder="Your Message"
                    name="details"
                    defaultValue=""
                  />
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Contact;

const ContactTextArea = ({ row, placeholder, name, defaultValue }) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

const ContactInputBox = ({ type, placeholder, name }) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};
