import { Modal } from "~~/app/list/@modal/modal";
import { Url } from "~~/model/url-model";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const url = await Url.findOne({ _id: params.id });
  return {
    title: `Mini URL Shortener - List | details-${url.shortId}`,
    description: `Mini URL Shortener - List | details-${url.redirectUrl}`,
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
