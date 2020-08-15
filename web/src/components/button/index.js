import { h } from "preact";

const Button = ({ to, children }) => (
  <div class="bg-purple-600 hover:bg-purple-700 text-white text-center font-bold py-2 px-4 rounded">
    {children}
  </div>
);

export default Button;
