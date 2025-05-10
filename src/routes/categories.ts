import { Router } from 'express';
import { categoriesController } from '../controllers/categories-controller';

const router = Router();

router.post('/create-category', categoriesController.createCategory);
router.post('/create-subcategory/', categoriesController.createSubcategory);
router.get('/categories-list/', categoriesController.getCategories);
router.get('/subcategories-list/:id', categoriesController.getSubcategories);

export const categoriesRouter = router;
