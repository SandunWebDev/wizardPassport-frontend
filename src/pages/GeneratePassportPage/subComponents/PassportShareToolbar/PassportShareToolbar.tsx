import React from 'react';

import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	ButtonGroup,
	ButtonProps,
	Code,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiFillCloseSquare as AiFillCloseSquareIcon } from 'react-icons/ai';
import { FaCopy as FaCopyIcon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-location';

import { TPassportData } from '../../../../commonTypes/passport';
import { toast } from '../../../../components/toasters/Toaster/Toaster';
import {
	downloadElementAsImage,
	downloadElementAsSvg,
} from '../../../../utilities/imageDownloadUtilities';

import {
	getDirectLinkToMyPassportPage,
	getDirectSvgLink,
	getIFrameCodeAsString,
	getMarkdownCodeAsString,
	getMyPassportPageRouteSearchParamsAsObject,
} from './helperFunctions';

import './PassportShareToolbar.css';

// Helper function to programmatically click "Chakra Popup's Close Button".
// This is used as temporary hackish solution to close popup when certain things happen. (Ex. Close MarkdownCode Popup when "Copy" button is clicked.)
function clickOnChakraPopupCloseButton() {
	try {
		const allCloseButtons = document.querySelectorAll(
			'.chakra-popover__close-btn',
		);

		// eslint-disable-next-line unicorn/prefer-spread, unicorn/no-array-for-each
		Array.from(allCloseButtons).forEach((closeButton) => {
			const elem = closeButton as HTMLElement;
			elem.click();
		});

		// eslint-disable-next-line no-empty
	} catch {}
}

type TToolbarVerticalDrawerMenuVersionSpecificProps = {
	toggler?: string | React.ReactNode; // New Toggler
	togglerProps?: ButtonProps; // Props for Existing Toggler
	togglerText?: string | React.ReactNode; // Text for Existing Toggler
	showNewButton?: boolean; // Should show Button to Create New Passport. (Useful when used in IFrame mode)
};

type TToolbarVerticalDrawerMenuVersionProps = TPassportShareToolbarProps;

function ToolbarVerticalDrawerMenuVersion(
	props: TToolbarVerticalDrawerMenuVersionProps,
) {
	const {
		passportWrapperElem,
		passportElem,
		passportData,
		verticalDrawerTypeProps = {},
	} = props;

	const {
		toggler,
		togglerProps = {},
		togglerText = 'SHARE',
		showNewButton = false,
	} = verticalDrawerTypeProps;

	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();

	// SIDE-NOTE : Most menu styles are on 'PassportShareToolbar.css' file.

	return (
		<Box className='ToolbarVerticalDrawerMenuVersion'>
			<Box
				onClick={() => {
					onOpen();
				}}>
				{toggler || (
					<Button
						colorScheme='teal'
						leftIcon={<HamburgerIcon />}
						variant='solid'
						{...togglerProps}>
						{togglerText}
					</Button>
				)}
			</Box>

			<Drawer placement='right' onClose={onClose} isOpen={isOpen} size='sm'>
				<DrawerOverlay />
				<DrawerContent bg='brand.background.primary' color='brand.text.primary'>
					<DrawerHeader
						bg='#6c878f'
						color='brand.text.primary'
						padding='10px 20px'>
						<Box display='flex' alignItems='center'>
							<Box>Share & Download Menu</Box>
							<Box
								marginLeft='auto'
								cursor='pointer'
								title='Close'
								onClick={() => onClose()}>
								<Icon
									as={AiFillCloseSquareIcon}
									fontSize='30px'
									marginBottom='-6px'
								/>
							</Box>
						</Box>
					</DrawerHeader>

					<DrawerBody paddingTop='30px' paddingLeft='0px'>
						<Box
							className='ToolbarVerticalDrawerMenuVersion__Menu'
							// Closing drawer when clicked on any menuItem.
							onClick={(e) => {
								const target = e.target as HTMLElement;

								// Helper utility to check clicked item "decedent of menuItem"
								function hasParentWithMatchingSelector(
									searchTarget: HTMLElement,
									selector: string,
								) {
									return [...document.querySelectorAll(selector)].some((el) => {
										const elem = el as HTMLElement;
										return elem !== searchTarget && elem.contains(searchTarget);
									});
								}

								const isMenuItem = target.classList.contains('menuItem');
								const isDecedentOfMenuItem = hasParentWithMatchingSelector(
									target,
									'.menuItem',
								);

								if (isMenuItem || isDecedentOfMenuItem) {
									onClose();
								}
							}}>
							{/* A optional button that allow to create new passport by navigating to generate-passport page. */}
							{showNewButton && (
								<Box className='menuGroupSubItemsWrapper'>
									<Box
										className='menuItem'
										display='flex'
										justifyContent='flex-end'
										marginTop='-20px'
										_hover={{ background: 'none !important' }}>
										<Box>
											<Text fontSize='sm'>Not Your&apos;s? New?</Text>
											<Link to='/generate-passport/new' target='_blank'>
												<Button rightIcon={<AddIcon />} colorScheme='teal'>
													Get Your&apos;s Here
												</Button>
											</Link>
										</Box>
									</Box>
								</Box>
							)}

							<Box className='menuGroupTitle'>USE AS</Box>
							<Box className='menuGroupSubItemsWrapper'>
								<Box
									className='menuItem'
									onClick={() =>
										navigate({
											to: '/my-passport',
											search:
												getMyPassportPageRouteSearchParamsAsObject(
													passportData,
												),
										})
									}>
									<Box>WEB</Box>
								</Box>

								<Box className='menuItem'>
									<CopyToClipboard
										text={getIFrameCodeAsString(passportData)}
										onCopy={() => {
											toast.info('IFrame Code Copied.');
											clickOnChakraPopupCloseButton();
										}}>
										<Box>IFRAME</Box>
									</CopyToClipboard>
								</Box>

								<Box className='menuItem'>
									<CopyToClipboard
										text={getMarkdownCodeAsString(passportData)}
										onCopy={() => {
											toast.info('Markdown Code Copied.');
											clickOnChakraPopupCloseButton();
										}}>
										<Box>MARKDOWN</Box>
									</CopyToClipboard>
								</Box>

								<Box className='menuItem'>
									<Box>
										<a
											href={getDirectSvgLink(passportData)}
											target='_blank'
											rel='noreferrer'>
											DIRECT SVG
										</a>
									</Box>
								</Box>
							</Box>

							<Box className='menuGroupTitle'>DOWNLOAD AS</Box>
							<Box className='menuGroupSubItemsWrapper'>
								<Box
									className='menuItem'
									onClick={async () => {
										if (passportWrapperElem.current) {
											await downloadElementAsImage(
												passportWrapperElem.current,
												{
													type: 'jpg',
													fileName: 'WizardPassport',
												},
											);
										}
									}}>
									JPG
								</Box>

								<Box
									className='menuItem'
									// eslint-disable-next-line sonarjs/no-identical-functions
									onClick={async () => {
										if (passportWrapperElem.current) {
											await downloadElementAsImage(
												passportWrapperElem.current,
												{
													type: 'jpg',
													fileName: 'WizardPassport',
												},
											);
										}
									}}>
									PNG
								</Box>

								<Box
									className='menuItem'
									onClick={() => {
										if (passportElem.current) {
											downloadElementAsSvg(passportElem.current, {
												fileName: 'WizardPassport',
											});
										}
									}}>
									SVG
								</Box>
							</Box>

							<Box className='menuGroupTitle'>SHARE ON</Box>
							<Box className='menuGroupSubItemsWrapper'>
								<Box className='menuItem'>
									<div
										// className='fb-share-button'
										data-href={getDirectLinkToMyPassportPage(passportData)}
										data-layout='button'
										data-size='large'>
										<a
											target='_blank'
											href={`https://www.facebook.com/sharer/sharer.php?u=${getDirectLinkToMyPassportPage(
												passportData,
											)}&amp;src=sdkpreparse`}
											className='fb-xfbml-parse-ignore'
											rel='noreferrer'>
											FACEBOOOK
										</a>
									</div>
								</Box>

								<Box className='menuItem'>
									<Box>
										<a
											className='twitter-share-button'
											target='_blank'
											data-size='large'
											href={`https://twitter.com/intent/tweet?text=${getDirectLinkToMyPassportPage(
												passportData,
											)}`}
											rel='noreferrer'>
											TWITTER
										</a>
									</Box>
								</Box>
							</Box>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
}

type TToolbarHorizontalMenuVersionProps = TPassportShareToolbarProps;

function ToolbarHorizontalMenuVersion(
	props: TToolbarHorizontalMenuVersionProps,
) {
	const { passportWrapperElem, passportElem, passportData } = props;

	const buttonGroupTitleButtonProps = {
		disabled: true,
		background: 'green.600',
		_hover: { background: 'green.600' },
		color: 'white',
		justifyContent: 'flex-end',
		minWidth: '115px',
		opacity: '1 !important',
		borderColor: 'teal',
		borderRightColor: 'teal.600',
	};

	const buttonGroupActionButtonProps = {
		background: 'teal.700',
		_hover: {
			background: 'teal.600',
		},
		color: 'white',
		borderColor: 'teal.600',
		borderLeftColor: 'transparent',
	};

	return (
		<Box
			className='ToolbarHorizontalMenuVersion'
			sx={{
				// Targeting each Main Group sections.
				'& > div': {
					marginBottom: ' 5px',
				},
			}}>
			{/* UseAs Button */}
			<Box>
				<ButtonGroup size='md' isAttached variant='outline'>
					<Button {...buttonGroupTitleButtonProps}>USE AS</Button>

					<Button {...buttonGroupActionButtonProps}>
						<Link
							to='/my-passport'
							target='_blank'
							search={{
								...getMyPassportPageRouteSearchParamsAsObject(passportData),
							}}>
							WEB
						</Link>
					</Button>

					{/* IFRAME Button */}
					<Popover>
						<PopoverTrigger>
							<Button {...buttonGroupActionButtonProps}>IFRAME</Button>
						</PopoverTrigger>

						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>IFrame Code</PopoverHeader>

							<PopoverBody>
								<Code width='100%'>{getIFrameCodeAsString(passportData)}</Code>

								<CopyToClipboard
									text={getIFrameCodeAsString(passportData)}
									onCopy={() => {
										toast.info('IFrame Code Copied.');
										clickOnChakraPopupCloseButton();
									}}>
									<Button
										width='100%'
										marginTop='10px'
										leftIcon={<FaCopyIcon />}>
										COPY
									</Button>
								</CopyToClipboard>
							</PopoverBody>
						</PopoverContent>
					</Popover>

					{/* Markdown Button */}
					<Popover>
						<PopoverTrigger>
							<Button {...buttonGroupActionButtonProps}>MARKDOWN</Button>
						</PopoverTrigger>

						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>Markdown Code</PopoverHeader>

							<PopoverBody>
								<Code width='100%'>
									{getMarkdownCodeAsString(passportData)}
								</Code>

								<CopyToClipboard
									text={getMarkdownCodeAsString(passportData)}
									onCopy={() => {
										toast.info('Markdown Code Copied.');
										clickOnChakraPopupCloseButton();
									}}>
									<Button
										width='100%'
										marginTop='10px'
										leftIcon={<FaCopyIcon />}>
										COPY
									</Button>
								</CopyToClipboard>
							</PopoverBody>
						</PopoverContent>
					</Popover>

					<Button {...buttonGroupActionButtonProps}>
						<a
							href={getDirectSvgLink(passportData)}
							target='_blank'
							rel='noreferrer'>
							DIRECT SVG
						</a>
					</Button>
				</ButtonGroup>
			</Box>

			{/* Download Buttons */}
			<Box>
				<ButtonGroup size='md' isAttached variant='outline'>
					<Button {...buttonGroupTitleButtonProps}>DOWNLOAD AS</Button>

					<Button
						{...buttonGroupActionButtonProps}
						onClick={async () => {
							if (passportWrapperElem.current) {
								await downloadElementAsImage(passportWrapperElem.current, {
									type: 'jpg',
									fileName: 'WizardPassport',
								});
							}
						}}>
						JPG
					</Button>

					<Button
						{...buttonGroupActionButtonProps}
						onClick={async () => {
							if (passportWrapperElem.current) {
								await downloadElementAsImage(passportWrapperElem.current, {
									type: 'png',
									fileName: 'WizardPassport',
								});
							}
						}}>
						PNG
					</Button>

					<Button
						{...buttonGroupActionButtonProps}
						// eslint-disable-next-line sonarjs/no-identical-functions
						onClick={async () => {
							if (passportElem.current) {
								downloadElementAsSvg(passportElem.current, {
									fileName: 'WizardPassport',
								});
							}
						}}>
						SVG
					</Button>
				</ButtonGroup>
			</Box>

			{/* Social Media Buttons */}
			<Box>
				<ButtonGroup size='md' isAttached variant='outline'>
					<Button {...buttonGroupTitleButtonProps}>SHARE ON</Button>

					<Button {...buttonGroupActionButtonProps}>
						<div
							// className='fb-share-button'
							data-href={getDirectLinkToMyPassportPage(passportData)}
							data-layout='button'
							data-size='large'>
							<a
								target='_blank'
								href={`https://www.facebook.com/sharer/sharer.php?u=${getDirectLinkToMyPassportPage(
									passportData,
								)}&amp;src=sdkpreparse`}
								className='fb-xfbml-parse-ignore'
								rel='noreferrer'>
								FACEBOOOK
							</a>
						</div>
					</Button>

					<Button {...buttonGroupActionButtonProps}>
						<a
							className='twitter-share-button'
							target='_blank'
							data-size='large'
							href={`https://twitter.com/intent/tweet?text=${getDirectLinkToMyPassportPage(
								passportData,
							)}`}
							rel='noreferrer'>
							TWITTER
						</a>
					</Button>
				</ButtonGroup>
			</Box>
		</Box>
	);
}

type TPassportShareToolbarProps = {
	passportWrapperElem: React.MutableRefObject<null>; // Ref for Div Wrapper around <Passport/> component. (// We need this, Because direct "passportElem" reference doesn't work with "downloadElementAsImage() / html2canvas")
	passportElem: React.MutableRefObject<null>; // Ref for direct <Passport/> component.
	passportData: TPassportData;

	type?: 'verticalDrawer' | 'horizontal';

	verticalDrawerTypeProps?: TToolbarVerticalDrawerMenuVersionSpecificProps; // Only applicable to <ToolbarVerticalDrawerMenuVersion/>. (Ex. When type is "verticalDrawer")
};

export default function PassportShareToolbar(
	props: TPassportShareToolbarProps,
) {
	const { type = 'verticalDrawer' } = props;

	return (
		<Box className='PassportShareToolbar'>
			{/* Mostly suitable for Mobile Resolutions. */}
			{type === 'verticalDrawer' && (
				<ToolbarVerticalDrawerMenuVersion {...props} />
			)}

			{/* Mostly suitable for Larger Resolutions. */}
			{type === 'horizontal' && <ToolbarHorizontalMenuVersion {...props} />}
		</Box>
	);
}
