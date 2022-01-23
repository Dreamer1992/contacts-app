import React from 'react';
import { Grid, Container, Typography, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContacts } from './useContacts';
import ContactsTable from '../../components/ContactsTable';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(3),
	},
	headContainer: {
		marginBottom: theme.spacing(2) + ' !important',
	},
}));

const Contacts = () => {
	const { data, isLoading, isError } = useContacts();
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Grid container>
				<Grid item xs={12} className={classes.headContainer}>
					<Typography variant="h4" component="h1">
						Пользователи
					</Typography>
				</Grid>

				<Grid item xs={12}>
					{(() => {
						if (isLoading) {
							return <LinearProgress color="success" />;
						}

						if (isError) {
							return <Typography>Ошибка...</Typography>;
						}

						return <ContactsTable data={data} />;
					})()}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Contacts;
