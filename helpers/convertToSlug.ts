import slugify from 'slugify';
import removeAccents from 'remove-accents';
export const convertToSlug = (text: string): string => {
    const slug = slugify(removeAccents(text), { lower: true, strict: true });
    return slug;
}