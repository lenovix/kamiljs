export async function getServerSideProps() {
    return {
      time: new Date().toLocaleString(),
    };
  }
  
  export default function Page({ time }) {
    return `
      <div style="text-align: center">
        <h1>Server Time</h1>
        <p>${time}</p>
      </div>
    `;
  }