import React from 'react';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useScrollTrigger } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: theme.spacing(9),
  },
}));

export interface HeaderProps {
  text: string;
  options?: React.ReactChild;
  isAbove?: boolean;
}

const Header: React.FC<HeaderProps> = ({ text, options, isAbove = false }) => {
  const classes = useStyles();
  const hideOnScrollTrigger = useScrollTrigger();
  return (
    <>
      <Slide appear={false} direction="down" in={!hideOnScrollTrigger}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography component="h1" variant="h6">
              {text}
            </Typography>
            {options}
          </Toolbar>
        </AppBar>
      </Slide>
      {!isAbove && <Divider className={classes.divider} />}
    </>
  );
};

export default Header;
