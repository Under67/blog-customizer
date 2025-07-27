import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

type Props = {
	onApply: (values: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackgroundColors, setSelectedBackgroundColors] =
		useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidthArr, setSelectedContentWidthArr] =
		useState<OptionType>(contentWidthArr[0]);
	function handleReset(event: SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();

		const defaultFontSize = fontSizeOptions[0];
		const defaultFontFamily = fontFamilyOptions[0];
		const defaultFontColor = fontColors[0];
		const defaultBackgroundColor = backgroundColors[0];
		const defaultContentWidth = contentWidthArr[0];

		setSelectedFontSize(defaultFontSize);
		setSelectedFontFamily(defaultFontFamily);
		setSelectedFontColor(defaultFontColor);
		setSelectedBackgroundColors(defaultBackgroundColor);
		setSelectedContentWidthArr(defaultContentWidth);

		onApply({
			fontSizeOption: defaultFontSize,
			fontFamilyOption: defaultFontFamily,
			fontColor: defaultFontColor,
			backgroundColor: defaultBackgroundColor,
			contentWidth: defaultContentWidth,
		});
	}
	function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		onApply({
			fontSizeOption: selectedFontSize,
			fontFamilyOption: selectedFontFamily,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColors,
			contentWidth: selectedContentWidthArr,
		});
	}
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<div className={styles.overlay} onClick={() => setIsOpen(false)}>
					<aside
						className={clsx(styles.container, {
							[styles.container_open]: isOpen,
						})}
						onClick={(e) => e.stopPropagation()}>
						<form
							className={styles.form}
							onSubmit={handleSubmit}
							onReset={handleReset}>
							<Text as='h2' weight={800} uppercase size={31}>
								Задайте параметры
							</Text>
							<Select
								title='Шрифт'
								options={fontFamilyOptions}
								selected={selectedFontFamily}
								onChange={setSelectedFontFamily}
							/>
							<RadioGroup
								name='font-size'
								title='Размер шрифта'
								options={fontSizeOptions}
								selected={selectedFontSize}
								onChange={setSelectedFontSize}
							/>
							<Select
								title='Цвет шрифта'
								options={fontColors}
								selected={selectedFontColor}
								onChange={setSelectedFontColor}
							/>
							<Separator />
							<Select
								title='Цвет фона'
								options={backgroundColors}
								selected={selectedBackgroundColors}
								onChange={setSelectedBackgroundColors}
							/>
							<Select
								title='Ширина контента'
								options={contentWidthArr}
								selected={selectedContentWidthArr}
								onChange={setSelectedContentWidthArr}
							/>
							<div className={styles.bottomContainer}>
								<Button title='Сбросить' htmlType='reset' type='clear' />
								<Button title='Применить' htmlType='submit' type='apply' />
							</div>
						</form>
					</aside>
				</div>
			)}
		</>
	);
};
