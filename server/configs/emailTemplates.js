export const NEWSLETTER_SUBSCRIPTION_TEMPLATE = `

<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8">
  <title>Newsletter Subscription</title>

  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f5f2eb;
      font-family: 'Inter', sans-serif;
    }

    table,
    td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 620px;
      margin: 50px auto;
      background: #ffffff;
      border: 1px solid #e7e2d8;
    }

    .hero {
      background: #111111;
      padding: 70px 40px;
      text-align: center;
    }

    .hero h1 {
      margin: 0;
      color: #d4af37;
      font-size: 42px;
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .hero p {
      color: #d1d5db;
      margin-top: 12px;
      font-size: 15px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .content {
      padding: 55px 45px;
    }

    .welcome {
      font-size: 18px;
      color: #111827;
      margin-bottom: 18px;
      font-weight: 600;
    }

    .text {
      font-size: 15px;
      line-height: 30px;
      color: #4b5563;
    }

    .divider {
      width: 80px;
      height: 2px;
      background: #d4af37;
      margin: 35px auto;
    }

    .quote-box {
      background: #faf8f3;
      border-left: 4px solid #d4af37;
      padding: 25px;
      margin: 35px 0;
    }

    .quote {
      font-size: 17px;
      line-height: 30px;
      color: #374151;
      font-style: italic;
      font-family: 'Cormorant Garamond', serif;
    }

    .benefits {
      margin: 30px 0;
      padding-left: 0;
      list-style: none;
    }

    .benefits li {
      padding: 10px 0;
      color: #4b5563;
      font-size: 15px;
    }

    .button {
      display: inline-block;
      background: #111111;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-top: 10px;
    }

    .center {
      text-align: center;
    }

    .footer {
      background: #faf8f3;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 13px;
      border-top: 1px solid #ece7de;
    }

    .email-box {
      background: #faf8f3;
      border: 1px solid #ece7de;
      padding: 18px;
      margin-top: 30px;
      text-align: center;
      color: #374151;
      font-size: 14px;
    }

    @media only screen and (max-width: 600px) {

      .content,
      .hero {
        padding: 35px 25px;
      }

      .hero h1 {
        font-size: 32px;
      }
    }
  </style>

</head>

<body>

  <table width="100%">
    <tr>
      <td align="center">


    <table class="container">

      <tr>
        <td class="hero">
          <h1>Thank You</h1>
          <p>Newsletter Subscription Confirmed</p>
        </td>
      </tr>

      <tr>
        <td class="content">

          <div class="welcome">
            Welcome to Our Community,
          </div>

          <div class="text">
            Thank you for subscribing to our newsletter. We're delighted to have you with us.

            You've just unlocked exclusive access to updates, premium offers, seasonal collections, shopping inspiration, and insider announcements delivered directly to your inbox.
          </div>

          <div class="divider"></div>

          <div class="quote-box">
            <div class="quote">
              "Great experiences begin with staying connected."
            </div>
          </div>

          <div class="text">
            As a valued subscriber, you'll enjoy:
          </div>

          <ul class="benefits">
            <li>✨ Early access to exclusive offers</li>
            <li>🛍️ Curated product recommendations</li>
            <li>🎁 Subscriber-only promotions</li>
            <li>🚀 New arrivals and feature updates</li>
          </ul>

          <div class="email-box">
            Subscription registered for:<br>
            <strong>{{email}}</strong>
          </div>

          <div class="center">
            <a href="{{websiteUrl}}" class="button">
              EXPLORE COLLECTIONS
            </a>
          </div>

        </td>
      </tr>

      <tr>
        <td class="footer">
          © 2026 Your Brand<br>
          Quality Products • Exceptional Experiences
        </td>
      </tr>

    </table>

  </td>
</tr>


  </table>

</body>
</html>
`;

// new register user welcome template
export const WELCOME_TEMPLATE = `

<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8">
  <title>Welcome</title>

  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f5f2eb;
      font-family: 'Inter', sans-serif;
    }

    table,
    td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 620px;
      margin: 50px auto;
      background: #ffffff;
      border: 1px solid #e7e2d8;
    }

    .hero {
      background: #111111;
      padding: 70px 40px;
      text-align: center;
    }

    .hero h1 {
      margin: 0;
      color: #d4af37;
      font-size: 42px;
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .hero p {
      color: #d1d5db;
      margin-top: 12px;
      font-size: 15px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .content {
      padding: 55px 45px;
    }

    .welcome {
      font-size: 18px;
      color: #111827;
      margin-bottom: 18px;
      font-weight: 600;
    }

    .text {
      font-size: 15px;
      line-height: 30px;
      color: #4b5563;
    }

    .divider {
      width: 80px;
      height: 2px;
      background: #d4af37;
      margin: 35px auto;
    }

    .quote-box {
      background: #faf8f3;
      border-left: 4px solid #d4af37;
      padding: 25px;
      margin: 35px 0;
    }

    .quote {
      font-size: 17px;
      line-height: 30px;
      color: #374151;
      font-style: italic;
      font-family: 'Cormorant Garamond', serif;
    }

    .button {
      display: inline-block;
      background: #111111;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-top: 10px;
    }

    .center {
      text-align: center;
    }

    .footer {
      background: #faf8f3;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 13px;
      border-top: 1px solid #ece7de;
    }

    @media only screen and (max-width: 600px) {

      .content,
      .hero {
        padding: 35px 25px;
      }

      .hero h1 {
        font-size: 32px;
      }
    }
  </style>

</head>

<body>

  <table width="100%">
    <tr>
      <td align="center">


    <table class="container">

      <tr>
        <td class="hero">
          <h1>Welcome</h1>
          <p>Exclusive Access Granted</p>
        </td>
      </tr>

      <tr>
        <td class="content">

          <div class="welcome">
            Dear {{name}},
          </div>

          <div class="text">
            We are delighted to welcome you to our distinguished community.

            Your account has been successfully activated, granting you access to a carefully curated experience designed for collectors, enthusiasts, and explorers alike.
          </div>

          <div class="divider"></div>

          <div class="quote-box">
            <div class="quote">
              "Every remarkable discovery begins with curiosity."
            </div>
          </div>

          <div class="text">
            Explore rare collections, uncover fascinating stories, and engage with extraordinary artifacts that connect the past with the present.
          </div>

          <div class="center">
            <a href="{{websiteUrl}}" class="button">
              BEGIN EXPLORING
            </a>
          </div>

        </td>
      </tr>

      <tr>
        <td class="footer">
          © 2026 Your Auction House<br>
          Preserving History • Celebrating Heritage
        </td>
      </tr>

    </table>

  </td>
</tr>


  </table>

</body>
</html>

`;

// order confirmation mail
export const COD_ORDER_CONFIRMATION_TEMPLATE = `

<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8">
  <title>Order Confirmation</title>

  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f5f2eb;
      font-family: 'Inter', sans-serif;
    }

    table,
    td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 620px;
      margin: 50px auto;
      background: #ffffff;
      border: 1px solid #e7e2d8;
    }

    .hero {
      background: #111111;
      padding: 70px 40px;
      text-align: center;
    }

    .hero h1 {
      margin: 0;
      color: #d4af37;
      font-size: 42px;
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .hero p {
      color: #d1d5db;
      margin-top: 12px;
      font-size: 15px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .content {
      padding: 55px 45px;
    }

    .welcome {
      font-size: 18px;
      color: #111827;
      margin-bottom: 18px;
      font-weight: 600;
    }

    .text {
      font-size: 15px;
      line-height: 30px;
      color: #4b5563;
    }

    .divider {
      width: 80px;
      height: 2px;
      background: #d4af37;
      margin: 35px auto;
    }

    .quote-box {
      background: #faf8f3;
      border-left: 4px solid #d4af37;
      padding: 25px;
      margin: 35px 0;
    }

    .quote {
      font-size: 17px;
      line-height: 30px;
      color: #374151;
      font-style: italic;
      font-family: 'Cormorant Garamond', serif;
    }

    .order-box {
      background: #faf8f3;
      border: 1px solid #ece7de;
      padding: 22px;
      margin: 30px 0;
    }

    .order-title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 10px;
    }

    .button {
      display: inline-block;
      background: #111111;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-top: 10px;
    }

    .center {
      text-align: center;
    }

    .footer {
      background: #faf8f3;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 13px;
      border-top: 1px solid #ece7de;
    }

    @media only screen and (max-width: 600px) {

      .content,
      .hero {
        padding: 35px 25px;
      }

      .hero h1 {
        font-size: 32px;
      }
    }
  </style>

</head>

<body>

  <table width="100%">
    <tr>
      <td align="center">


    <table class="container">

      <tr>
        <td class="hero">
          <h1>Order Confirmed</h1>
          <p>Thank You For Shopping With Us</p>
        </td>
      </tr>

      <tr>
        <td class="content">

          <div class="welcome">
            Dear {{name}},
          </div>

          <div class="text">
            Thank you for placing your order with us. We truly appreciate your trust and are delighted to serve you.

            Your order has been successfully received and is now being prepared with care. Since you selected <strong>Cash on Delivery (COD)</strong>, payment can be made when your order arrives at your doorstep.
          </div>

          <div class="divider"></div>

          <div class="quote-box">
            <div class="quote">
              "Great products deserve a great shopping experience."
            </div>
          </div>

          <div class="order-box">
            <div class="order-title">
              Order Information
            </div>

            <div class="text">
              <strong>Order ID:</strong> {{orderId}}<br>
              <strong>Payment Method:</strong> Cash on Delivery (COD)<br>
              <strong>Order Amount:</strong> ₹{{amount}}
            </div>
          </div>

          <div class="text">
            Our team is now processing your order. You'll receive updates as soon as your package is dispatched.

            We are committed to delivering quality products and a seamless shopping experience every time you shop with us.
          </div>

          <div class="center">
            <a href="{{websiteUrl}}" class="button">
              CONTINUE SHOPPING
            </a>
          </div>

        </td>
      </tr>

      <tr>
        <td class="footer">
          © 2026 Your Store<br>
          Fresh Products • Fast Delivery • Trusted Service
        </td>
      </tr>

    </table>

  </td>
</tr>


  </table>

</body>
</html>

`;
