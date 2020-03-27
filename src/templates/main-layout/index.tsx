import React from 'react';
import Container from '@material-ui/core/Container';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Header from '../../molecules/header';
import ScrollTop from '../../organisms/scroll-top';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  resizableContainer: {
    transition: '0.5s',
  },
  item: {
    padding: theme.spacing(2),
    height: '100%',
  },
}));

export interface MainLayoutProps {
  headerText: string;
  topLeftChildren: React.ReactNode;
  topRightChildren: React.ReactNode;
  bottomLeftChildren: React.ReactNode;
  bottomRightChildren: React.ReactNode;
  topLeftRef?: React.RefObject<unknown>;
  topRightRef?: React.RefObject<unknown>;
  bottomLeftRef?: React.RefObject<unknown>;
  bottomRightRef?: React.RefObject<unknown>;
  grownBottomLeftLgSize?: GridProps['lg'];
  shrinkedBottomLeftLgSize?: GridProps['lg'];
  isGrown?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  headerText,
  topLeftChildren,
  topRightChildren,
  bottomLeftChildren,
  bottomRightChildren,
  topLeftRef,
  topRightRef,
  bottomLeftRef,
  bottomRightRef,
  grownBottomLeftLgSize = 12,
  shrinkedBottomLeftLgSize = 9,
  isGrown = true,
}) => {
  const classes = useStyles();
  return (
    <Container>
      <Header text={headerText} />
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.item} ref={topLeftRef}>
            {topLeftChildren}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.item} ref={topRightRef}>
            {topRightChildren}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          lg={isGrown ? grownBottomLeftLgSize : shrinkedBottomLeftLgSize}
          className={classes.resizableContainer}
        >
          <Paper className={classes.item} ref={bottomLeftRef}>
            {bottomLeftChildren}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          lg={
            isGrown
              ? 12
              : ((12 - (shrinkedBottomLeftLgSize as number)) as GridProps['lg'])
          }
          className={classes.resizableContainer}
          style={{
            opacity: isGrown ? 0 : 1,
            maxWidth: isGrown ? 0 : undefined,
          }}
        >
          <Paper
            className={classes.item}
            ref={bottomRightRef}
            style={{ display: isGrown ? 'none' : undefined }}
          >
            {bottomRightChildren}
          </Paper>
        </Grid>
      </Grid>
      <ScrollTop />
    </Container>
  );
};

export default MainLayout;
