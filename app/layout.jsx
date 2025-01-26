import "@styles/global.css";
import "@components/Navbar";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

export const metadata = {
  title: "getPrompt",
  description: "Discover the best prompts for your next writing session",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
