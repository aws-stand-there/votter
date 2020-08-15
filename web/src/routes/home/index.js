import { h } from "preact";
import style from "./style";

const Home = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <input
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      type="email"
      placeholder="jane@example.com"
    ></input>
  </div>
);

export default Home;
