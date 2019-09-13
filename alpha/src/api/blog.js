import action from '../actions';

const getBlogList = params => { return action("get_blog_list", params); };
const getBlogDetail = params => { return action("get_blog_detail", params); };

export default {
	getBlogList,
	getBlogDetail
}