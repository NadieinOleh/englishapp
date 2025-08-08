"use client";

const PRIVACY_URL = "https://www.paypal.com/webapps/mpp/ua/privacy-full";
const USER_AGREEMENT_URL =
  "https://www.paypal.com/webapps/mpp/ua/useragreement-full";

export const PayPalPolicy = () => {
  return (
    <section
      className="md:w-1/2 text-secondary font-semibold "
      aria-labelledby="paypal-policy-title"
    >
      <h2 id="paypal-policy-title" className="text-mainText">
        Payment and Privacy Policy
      </h2>

      <p>
        We value your security and privacy when making purchases. We use{" "}
        <strong>PayPal</strong>, one of the most reliable international payment
        platforms, to process all transactions.
      </p>

      <h3 className="text-mainText">How It Works</h3>
      <ul>
        <li>
          When you place an order, you will be redirected to PayPal’s secure
          payment page.
        </li>
        <li>
          You can pay using your credit/debit card or PayPal account balance.
        </li>
        <li>
          All payments are processed directly by PayPal using multi-layer
          encryption.
        </li>
      </ul>

      <h3>Data Protection</h3>
      <p>
        We do not receive or store your payment details (card numbers, CVV,
        passwords, etc.). All sensitive information is handled exclusively by
        PayPal in accordance with:
      </p>
      <ul className="flex justify-between items-center my-3">
        <li className="text-mainText">
          <a
            href={PRIVACY_URL}
            className="text-mainText hover:text-secondaryHover"
            target="_blank"
            rel="noopener noreferrer"
          >
            PayPal Privacy Policy
          </a>
        </li>
        <li>
          <a
            href={USER_AGREEMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mainText hover:text-secondaryHover"
          >
            PayPal User Agreement
          </a>
        </li>
      </ul>
      <h3 className="text-mainText">Buyer Protection</h3>
      <ul>
        <li>
          If a transaction is unauthorized or the item is not as described, you
          may use PayPal’s Buyer Protection to request a refund.
        </li>
        <li>
          We process all returns according to our own Return & Cancellation
          Policy.
        </li>
      </ul>

      <h3 className="text-mainText">Personal Data</h3>
      <p>
        We only collect the personal data required to complete your order (e.g.,
        contact information, shipping address). Your data is processed in
        compliance with applicable laws, including GDPR where relevant. For
        details, see our site’s <strong>Privacy Policy</strong>.
      </p>

      <h3 className="text-mainText">Agreement</h3>
      <p>
        By clicking the PayPal payment button, you agree to PayPal’s Terms of
        Service and consent to the necessary processing of your data to complete
        the transaction.
      </p>
    </section>
  );
};
