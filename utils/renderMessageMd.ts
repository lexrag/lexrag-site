import { remark } from 'remark';
import html from 'remark-html';

const renderMessageMd = async (content: string) => {
  try {
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
  } catch (e) {
    return content;
  }
};

export default renderMessageMd;
