import { Modal } from "~~/app/list/@modal/modal";
import { Url } from "~~/model/url-model";

const Analytics = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const url = await Url.findOne({ _id: params.id });
  return <Modal title={`Analytics of ${url.redirectUrl}`}>sdf</Modal>;
};

export default Analytics;
