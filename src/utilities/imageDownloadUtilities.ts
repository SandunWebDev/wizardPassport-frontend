import html2canvas from 'html2canvas';
import log from 'loglevel';

type TDownloadElementAsImageArgs = (
	element: HTMLElement,
	options: {
		type?: 'jpg' | 'png';
		fileName?: string;
	},
) => Promise<void>;

/* SIDE-NOTE: This has known caveats. It doesn't capture "font & font-family" styles defined in a SVG.
              To get around this problem, In relevant SVG files embed, fonts as base64 string, in a style tag.

	 Ex.
	  <svg>
 			<style>
					{`
						@font-face{
                font-family:"Roboto Condensed";
                src:url(data:application/font-woff;charset=utf-8;base64, Base64StringOfTTFFontFileHere) format("woff");
                font-weight:normal;font-style:normal;
            }
				`}
			</style>

			........
		</svg>
*/
export const downloadElementAsImage: TDownloadElementAsImageArgs =
	async function (element, options = {}) {
		try {
			const { type = 'png', fileName = 'image' } = options;

			// Convert element into Canvas Image.
			const elementAsCanvas = await html2canvas(element, {
				backgroundColor: null,
			});

			// Crating temporary link to be downloaded.
			const anchor = document.createElement('a');
			anchor.download = `${fileName}.${type}`;
			anchor.href = elementAsCanvas.toDataURL(`image/${type}`);

			// Initiating download.
			anchor.click();
			anchor.remove();
		} catch (error) {
			log.error('Downloading Element As Image Failed.\n', error);
		}
	};

type TDownloadElementAsSvgArgs = (
	element: HTMLElement,
	options: {
		type?: 'jpg' | 'png';
		fileName?: string;
	},
) => void;

export const downloadElementAsSvg: TDownloadElementAsSvgArgs = (
	element,
	options = {},
) => {
	try {
		const { fileName = 'image' } = options;

		// Crating temporary link to be downloaded.
		const anchor = document.createElement('a');
		anchor.download = `${fileName}.svg`;

		const encodedSvgElem = unescape(element.outerHTML);
		const moreEncodedSvgElem = encodedSvgElem.replaceAll('#', '%23'); // Check https://stackoverflow.com/questions/54453987/did-chrome-72-break-dataimage-svgxmlutf8-for-css-background-svgs

		// Converting element to SVG.
		anchor.href = `data:image/svg+xml;utf8,${moreEncodedSvgElem}`;

		// Initiating download.
		anchor.click();
		anchor.remove();
	} catch (error) {
		log.error('Downloading Element As SVG Failed.\n', error);
	}
};
