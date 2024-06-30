import { Modal } from "~~/app/list/@modal/modal";

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: "Mini URL Shortener | List | details",
  };
}
const page = () => {
  return (
    <Modal title="details">
      <div>details</div>
    </Modal>
  );
};

export default page;
