import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  Container
} from '@material-ui/core';
import { CalendarToday, List } from '@material-ui/icons';

const LinkTab = ({ label, href, icon }) => {
  const classes = {};
  return (
    <Link href={href} passHref>
      <Tooltip title={label}>
        <IconButton component="a" color="inherit">
          {icon}
        </IconButton>
      </Tooltip>
    </Link>
  );
};

const Navigation = ({ tab }) => (
  <AppBar position="static">
    <Container maxWidth="md">
      <LinkTab href="/" label="Teams" icon={<List />} />
      <LinkTab href="/schedule" label="Schedule" icon={<CalendarToday />} />
      {/* <IconButton>
        <MoreVert />
      </IconButton> */}
    </Container>
  </AppBar>
);

export default Navigation;
