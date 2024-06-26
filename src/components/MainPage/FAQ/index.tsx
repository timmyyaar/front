import React, { Fragment, useState } from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import arrowDownSvg from "./icons/arrow-down.svg";

export const FAQ = (props: any) => {
  const { t } = props;
  const [activeQuest, setActiveQuest] = useState("");
  const faqQuestions = [
    {
      title: "How do I make an order?",
      text: "You have three booking options: online, phone, or social media.",
      text2:
        "For online bookings, instant card payment is available. If you choose phone or social media and prefer online",
      text3: "payment, notify the manager for a payment link sent to you",
    },
    {
      title: "Subscription",
      text: "If you book cleanings regularly, you get a guaranteed discount: one cleaning per week — a 20% discount,",
      text2:
        "two cleanings per month — a 15% discount, one cleaning per month — a 10% discount. We can agree on a different",
      text3: "schedule and calculate an individual discount for you",
    },
    {
      title: "How to cancel the order",
      text: "Once you book on our website, an email confirmation follows, containing links to pay, edit, or cancel.",
      text2:
        "You can self-cancel up to 12 hours before your appointment. If within 12 hours, reach out to us via call center or social media for assistance",
    },
    {
      title: "Do I need to provide my own cleaning supplies?",
      text: "Our experts have everything they need to clean the entire apartment and wash the windows. We use professional supplies You only need to open the door",
    },
    {
      title:
        "What should I do if I'm dissatisfied with how the cleaning was done?",
      text: "After the cleaning service, you have 24 hours to check whether you like the results.",
      text2:
        "If you're not satisfied, you can, take pictures and send them to our email or social media. Please contact our customer support via email or phone, and tell us about what went wrong.",
      text3:
        "You may request a free 'correction cleaning' (with the same, or different cleaner depending on your preference).",
      text4:
        "You may also be eligible for a discount on future cleanings, as well as a partial or 100% refund.",
    },
    {
      title:
        "Is it possible for me to cancel, reschedule, or modify the reservation?",
      text: "Once you've made a reservation through our website, a confirmation email will be sent to you.",
      text2:
        "This email includes links for payment, as well as options to modify or cancel your booking.",
      text3:
        "You have the freedom to cancel your booking independently as long as it's at least 12 hours prior to your appointment.",
      text4:
        "If you need to cancel within the 12-hour window, please get in touch with our call center or message us via social media.",
      text5:
        "Similarly, you can adjust the details of your booking and the chosen date through these same channels.",
      text6:
        "During the cleaning, you can also request additional services or remove some of the options, which will be reflected in your final bill",
    },
    {
      title: "Things which are not included in cleaning services",
      text: "text1",
      text2: "text2",
      text3: "text3",
      text4: "text4",
    },
    {
      title: "Can I order few services at the same time?",
      text: "Yes, you can order any type of cleaning, ozonation and dry cleaning at the same time as well. It will not affect the duration of the cleaning.",
    },
    {
      title: "What is the eco-cleaning",
      text: "Many people are allergic to household chemicals, for them eco-friendly cleaning is the only way to keep clean",
    },
    {
      title: "Promocodes",
      text: 'Apply the code "TYT" for a 15% discount on your first order.',
      text2:
        "We also offer seasonal promotions with unique codes. Use the code when booking online or share it with our call center.",
      text3:
        "Promo code availability is limited; we might suggest minor date changes for your cleaning",
    },
  ];

  const toggleActiveQuest = (title: string) => {
    setActiveQuest((c) => (c === title ? "" : title));
  };

  const getFaqItem = (item: any) => (
    <div
      className="_w-full _rounded-[3rem] _bg-light _py-5 _px-10 lg:_py-7 _flex _flex-col _justify-center"
      key={JSON.stringify(item)}
    >
      <div className="_h-14 lg:_h-11 _flex _justify-between">
        <div className="_font-medium _text-xl _flex _items-center">
          <b>
            <Writer text={t(item.title)} />
          </b>
        </div>
        <div
          className={`_flex _items-center _justify-center _cursor-pointer
            _transition-all _duration-500 _w-11 ${
              activeQuest === item.title ? "_rotateX-180" : ""
            }`}
          onClick={() => toggleActiveQuest(item.title)}
        >
          <Image src={arrowDownSvg} alt="" />
        </div>
      </div>
      {activeQuest === item.title && (
        <div className="_mt-5">
          <Writer text={t(item.text)} />
          {[...new Array(6)].map(
            (_, j) =>
              item["text" + j] && (
                <div key={"faq-text-" + item.i + j}>
                  <Writer text={t(item["text" + j])} />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="_px-24 mobile-none">
        <div className="_main-title _mb-8">{t("FAQ")}</div>
        <div className="_w-full _flex _space-between _gap-5">
          <div className="_w-6/12 _grid _grid-cols-1 _gap-6 _justify-stretch">
            {faqQuestions.map((item, i) =>
              i % 2 ? (
                <Fragment key={"faq" + i + "left"}>
                  {getFaqItem({ ...item, i })}
                </Fragment>
              ) : null
            )}
          </div>
          <div className="_w-6/12 _grid _grid-cols-1 _gap-6 _justify-stretch">
            {faqQuestions.map((item, i) =>
              !(i % 2) ? (
                <Fragment key={"faq" + i + "right"}>
                  {getFaqItem({ ...item, i })}
                </Fragment>
              ) : null
            )}
          </div>
        </div>
      </div>
      <div className="mobile-only _px-5-percents-mobile _mb-14">
        <div className="_main-title _mb-4">{t("FAQ")}</div>
        <div className="_grid _grid-cols-1 _gap-6">
          {faqQuestions.map((item, i) => (
            <Fragment key={"faq" + i + "left"}>
              {getFaqItem({ ...item, i })}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
