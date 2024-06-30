import { Modal } from "~~/app/list/@modal/modal";

const DetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Modal title="test">
      <div>DetailsPage{params.id}</div>
    </Modal>
  );
};

export default DetailsPage;
