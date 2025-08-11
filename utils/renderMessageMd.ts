import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';

const addAttributesToLinks = () => {
    return (tree: any) => {
        visit(tree, 'element', (node) => {
            if (node.tagName === 'a') {
                node.properties = {
                    ...node.properties,
                    className: [...(node.properties.className || []), 'message-link'],
                };
            }
        });
    };
};

const renderMessageMd = async (content: string) => {
    try {
        const processedContent = await remark()
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(addAttributesToLinks)
            .use(rehypeStringify)
            .process(content);

        return processedContent.toString();
    } catch (e) {
        console.log(e);
        return content;
    }
};

export default renderMessageMd;
