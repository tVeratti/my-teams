import { Star, StarBorder } from '@material-ui/icons';
import { Zoom } from '@material-ui/core';

const StarCheckBox = ({ checked }) => {
  return checked ? (
    <Zoom in={true} unmountOnExit>
      <Star color="primary" />
    </Zoom>
  ) : (
    <StarBorder />
  );
};

export default StarCheckBox;
