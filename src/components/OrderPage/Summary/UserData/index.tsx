import React, { useEffect, useState } from 'react';

// import { QuestionIcon } from './icons/QuestionIcon';
// import { ReferralIcon } from './icons/ReferralIcon';
import { PaymentForm } from './components/PaymentForm';
import { CheckBox } from './components/Checkbox';
import { DateAndTime } from './components/DateAndTime';
import './style.scss';

export const UserData = ({ t }: any) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const [dataLayout, setDataLayout] = useState(false);
  const [dataAndTime, setDataAndTime] = useState('');
  const [addressLayout, setAddressLayout] = useState(false);
  const [address, setAddress] = useState('');

  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [postcode, setPostCode] = useState('');
  const [floor, setFloor] = useState('');
  const [entrance, setEntrance] = useState('');
  const [doorPhone, setDoorPhone] = useState('');
  const [more, setMore] = useState('');

  const [previous, setPrevious] = useState(false);
  const [publicAgreement, setPublicAgreement] = useState(false);
  const [personalData, setPersonalData] = useState(false);

  useEffect(() => {
    if (!addressLayout && (street || house || apartment || postcode || floor || entrance || doorPhone || more)) {
      setAddress(
        (`${street} ${house} ${apartment} ${postcode} ${floor} ${entrance} ${doorPhone} ${more}`)
      );
    }
  }, [addressLayout]);

  return (
    <div className="user-data-from">
      <div className="_mb-6 _flex _flex-col _gap-3">
        <div className="input-wrapper">
          <input
            type="text" placeholder="Surname and Name"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="_flex _gap-5">
          <div className="input-wrapper">
            <input
              type="text" placeholder="Contact number"
              value={number} onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text" placeholder="E-mail"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="_flex _gap-5">
          {!dataLayout ? (
            <div className={`select-block ${dataAndTime ? 'selected-block' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setDataLayout(true)}>
              {dataAndTime === '' ? 'Data and time' : dataAndTime}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 49" fill="none">
                <path d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z" fill="#13277E"/>
              </svg>
            </div>
          ) : (
            <div className="select-block-open select-block-open-data-time">
              <DateAndTime setDataAndTime={setDataAndTime} />
              <div className="order-wrapper" onClick={() => setDataLayout(false)}>Continue</div>
            </div>
          )}
        </div>
        <div className="_flex _gap-5">
          {!addressLayout ? (
            <div className="select-block" style={{ cursor: 'pointer' }} onClick={() => setAddressLayout(true)}>
              {address === '' ? 'Address' : address}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 49" fill="none">
                <path d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z" fill="#13277E"/>
              </svg>
            </div>
          ) : (
            <div className="select-block-open select-block-open-address">
              <div className="_mb-6 _flex _flex-col _gap-3">
                <div className="input-wrapper address-layout">
                  <input
                    type="text" placeholder="Street"
                    value={street} onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text" placeholder="House number"
                      value={house} onChange={(e) => setHouse(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper address-layout">
                    <input
                      type="text" placeholder="Apartment"
                      value={apartment} onChange={(e) => setApartment(e.target.value)}
                    />
                  </div>
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text" placeholder="Postcode"
                      value={postcode} onChange={(e) => setPostCode(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper address-layout">
                    <input
                      type="text" placeholder="Floor"
                      value={floor} onChange={(e) => setFloor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text" placeholder="Entrance number"
                      value={entrance} onChange={(e) => setEntrance(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper address-layout">
                    <input
                      type="text" placeholder="Doorphone code (optional)"
                      value={doorPhone} onChange={(e) => setDoorPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="input-wrapper address-layout">
                <textarea
                  placeholder="Add more details (optional)"
                  value={more} onChange={(e) => setMore(e.target.value)}
                />
              </div>
              <div
                className="order-wrapper"
                style={{ marginTop: '24px' }}
                onClick={() => setAddressLayout(false)}
              >
                Continue
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '24px' }}>
        <CheckBox title={'Request previous cleaner'} checked={previous} setCheck={setPrevious} t={t} />
      </div>
      {/* <div className="input-referral-code _cursor-pointer">
        <div className="input-wrapper _flex">
          <div className="icon-wrapper">
            <ReferralIcon />
          </div>
          <input className="input" type="text" />
          <div className="button-wrapper">
            Apply
          </div>
        </div>
      </div>
      <div className="_flex _justify-center">
        <QuestionIcon />
        <div className="sub-text">How it works?</div>
      </div> */}
      {/* <div>
        <PaymentForm />
      </div> */}
      <div style={{ marginTop: '24px' }}>
        <CheckBox title={'Public agreement and Privacy Policy'} checked={publicAgreement} setCheck={setPublicAgreement} t={t} />
      </div>
      <div style={{ marginTop: '24px' }}>
        <CheckBox title={'Personal data'} checked={personalData} setCheck={setPersonalData} t={t} />
      </div>
    </div>
  );
};
