import { Button } from "react-bootstrap";
import { IValidError } from "Types";
import ContactItem from "./ContactsItem";

export default function AdvertisersContactInfo() {
  const errors: IValidError[] = [];
  return (
    <div>
      <ContactItem errors={errors} />
      <div>
        <Button variant="outline-primary">Add Contact Person</Button>
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </div>
  );
}
