import Modal from "./Template";
import Button from "../Button";

export default function ConfirmModal({
  title = "Confirm",
  body,
  isOpen,
  onConfirm,
  onCancel,
}: {
  title: string;
  body: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const actions = (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </div>
  );

  return (
    <Modal title={title} onClose={onCancel} isOpen={isOpen} actions={actions}>
      <p>{body}</p>
    </Modal>
  );
}
