import { Modal } from "~~/app/list/@modal/modal";
import { Url } from "~~/model/url-model";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const url = await Url.findOne({ _id: params.id });
  return {
    title: `Mini URL Shortener - List | analytics-${url.shortId}`,
    description: `Mini URL Shortener - List | analytics-${url.redirectUrl}`,
  };
}

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
