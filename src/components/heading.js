import { Typography } from '@material-ui/core';

const Heading = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography color="textSecondary">{subtitle}</Typography>
    </div>
  );
};

export default Heading;
