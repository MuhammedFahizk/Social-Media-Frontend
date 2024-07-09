import PropTypes from "prop-types";

const FeedComments = ({ openComments }) => {
  return openComments ? (
    <div className="w-full max-h-[200px] px-5 py-2 border rounded">
      FeedComments
    </div>
  ) : null;
};

FeedComments.propTypes = {
  openComments: PropTypes.bool
};

export default FeedComments;
