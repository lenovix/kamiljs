export async function getServerSideProps() {
  return {
    props:{
      name: "Ichsanul Kamil Sudarmi",
      time: new Date().toLocaleString(),
      startDev: "20 May 2025"
    }
  };
}

export default function Home({ name, time, startDev }) {
  return `
    <h1>Welcome to KamilJS!</h1>
    <h2>Future is now</h2>
    <div class="footer">Version 0.0.3 | Develop by ${name} | Develop Start on ${startDev} | Time now is ${time}</div>
  `;
}