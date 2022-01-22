import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tooltip, ClickAwayListener } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCopyToClipboard } from 'react-use';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			'&:hover': {
				cursor: 'pointer',
			},
		},
		icon: {
			marginRight: theme.spacing(1),
		},
	})
);

const CopyToClipboardText = ({ text }) => {
	const classes = useStyles();
	const [, copyToClipboard] = useCopyToClipboard();
	const [statusCopy, setStatusCopy] = useState('Скопировать');

	const STATUS_COPY = {
		COPY: 'Скопировать',
		COPIED: 'Скопировано',
	};

	const TITLE_BY_STATUS = {
		[STATUS_COPY.COPY]: 'Скопировать',
		[STATUS_COPY.COPIED]: 'Скопировано',
	};

	const onClickCopy = useCallback(() => {
		copyToClipboard(text);
		setStatusCopy(STATUS_COPY.COPIED);
	}, [STATUS_COPY.COPIED, copyToClipboard, text]);

	const handleClickAway = useCallback(() => {
		setStatusCopy(STATUS_COPY.COPY);
	}, [STATUS_COPY.COPY]);

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Tooltip title={TITLE_BY_STATUS[statusCopy]} placement="top" arrow>
				<Box
					display="flex"
					alignitems="center"
					onClick={onClickCopy}
					className={classes.root}
				>
					<ContentCopyIcon
						fontSize="small"
						className={classes.icon}
					/>
					{text}
				</Box>
			</Tooltip>
		</ClickAwayListener>
	);
};

export default CopyToClipboardText;

CopyToClipboardText.propTypes = {
	text: PropTypes.string.isRequired,
};
