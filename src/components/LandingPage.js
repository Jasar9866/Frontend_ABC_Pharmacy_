import React from "react";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to ABC Pharmacy</h1>
        <p>Your trusted partner in health and wellness</p>
      </header>

      <section style={styles.section}>
        <h2>About Us</h2>
        <p>
          ABC Pharmacy is committed to providing high-quality pharmaceutical
          products and services. With a focus on customer care and community
          well-being, we strive to be your go-to destination for health needs.
        </p>
      </section>

      <section style={styles.section}>
        <h2>Explore Our Products</h2>
        <p>
          Browse through our wide range of pharmaceutical products, from
          over-the-counter medications to wellness supplements.
        </p>
        <a href="/items" style={styles.btnPrimary}>
          Explore Products
        </a>
      </section>
      <section style={styles.section}>
        <h2>Create Invoice</h2>
        <a href="/invoices" style={styles.btnPrimary}>
          Create Invoice
        </a>
      </section>
      <section style={styles.section}>
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? Our team is here to help. Contact
          us via phone or email.
        </p>
        <a href="/SendEmail" style={styles.btnSecondary}>
          Contact us
        </a>
      </section>
    </div>
  );
};

export default LandingPage;

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  title: {
    color: "#333",
  },
  section: {
    marginBottom: "30px",
  },
  btnPrimary: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
    cursor: "pointer",
  },
  btnSecondary: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
    cursor: "pointer",
  },
};
