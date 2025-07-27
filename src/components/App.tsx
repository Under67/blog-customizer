import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';

import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const style = {
		'--font-family': articleStyles.fontFamilyOption.value,
		'--font-size': articleStyles.fontSizeOption.value,
		'--font-color': articleStyles.fontColor.value,
		'--container-width': articleStyles.contentWidth.value,
		'--bg-color': articleStyles.backgroundColor.value,
	} as CSSProperties;
	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm onApply={setArticleStyles} />
			<Article />
		</main>
	);
};
