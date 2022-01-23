import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	Paper,
	Avatar,
	Typography,
} from '@mui/material';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import CopyToClipboardText from '../CopyToClipboardText';
import { NATIONALITIES_HUMAN_NAME } from '../../utils/constants/nationality';

const ContactsTable = ({ data }) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="contacts table">
				<TableHead>
					<TableRow>
						<TableCell>Аватар</TableCell>
						<TableCell>ФИО</TableCell>
						<TableCell>Дата рождения</TableCell>
						<TableCell>Почта</TableCell>
						<TableCell>Телефон</TableCell>
						<TableCell>Адрес</TableCell>
						<TableCell align="right">Национальность</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((contact) => (
						<TableRow key={contact.login.uuid}>
							<TableCell component="th" scope="row">
								<Avatar
									src={contact.picture.thumbnail}
									alt="Remy Sharp"
								/>
							</TableCell>
							<TableCell>
								{`${contact.name.title} ${contact.name.first} ${contact.name.last}`}
							</TableCell>
							<TableCell>
								<Typography>
									{format(
										parseISO(contact.dob.date),
										'MM.dd.yyyy'
									)}
								</Typography>
								<Typography>
									Возраст: {contact.dob.age}
								</Typography>
							</TableCell>
							<TableCell>
								<CopyToClipboardText text={contact.phone} />
							</TableCell>
							<TableCell>{contact.email}</TableCell>
							<TableCell>
								<Typography>
									{contact.location.country}
								</Typography>
								<Typography>
									{contact.location.city},{' '}
									{contact.location.street.name}{' '}
									{contact.location.street.number}
								</Typography>
							</TableCell>
							<TableCell align="right">
								{NATIONALITIES_HUMAN_NAME[contact.nat]}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ContactsTable;
