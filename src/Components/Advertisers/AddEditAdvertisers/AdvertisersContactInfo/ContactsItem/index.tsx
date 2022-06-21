import { IValidError } from "Types";
import { InputComp, InputTags } from "Components/MiniComponents";

interface ContactItemProps {
  errors: IValidError[];
}

export default function ContactItem({ errors }: ContactItemProps) {
  return (
    <div>
      <InputComp errors={errors} title="Contact person" name="person" />
      <InputComp errors={errors} title="Contact status">
        <InputTags isMulti={false} onChange={() => {}} name="status" />
      </InputComp>
      <InputComp errors={errors} title="Email" name="email" />
      <InputComp errors={errors} title="Messenger">
        <div></div>
      </InputComp>
    </div>
  );
}
