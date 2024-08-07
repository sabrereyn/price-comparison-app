import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalHeader({ children, close }) {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-11">{children}</div>
      <div className="col-span-1 flex justify-center">
        <button className="close" onClick={close}>
          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
        </button>
      </div>
      <div className="col-span-12">
        <hr />
      </div>
    </div>
  );
}
