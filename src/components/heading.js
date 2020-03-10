import { Typography } from '@material-ui/core';

const Heading = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <Typography variant="h4">{title}</Typography>
      {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}
    </div>
  );
};

export default Heading;
