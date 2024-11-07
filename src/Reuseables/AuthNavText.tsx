import { Link } from "react-router-dom";

interface customProps {
  linkText: string;
  link: any;
  text: string;
}

const AuthNavText: React.FC<customProps> = ({ link, linkText, text }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-[1rem]">
      <div>{text}</div>

      <Link className="font-bold underline" to={link}>{linkText}</Link>
    </div>
  );
};

export default AuthNavText;
