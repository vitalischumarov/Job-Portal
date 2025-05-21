import "./InputField.scss";

type PlaceholderMessage = {
  textForPlaceholder: string;
};

export default function InputField({ textForPlaceholder }: PlaceholderMessage) {
  return <input type="text" placeholder={textForPlaceholder}></input>;
}
