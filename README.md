# Enstaved E-Commerce

Enstaved e-commerce: [shop.enstaved.com](https://shop.enstaved.com).

## Branching

Saleor has a "designed to be forked" model. This means we must be mindful of whether or not a given change is something that might be pushed upstream.

### master

* Fork of [upstream Saleor](https://github.com/mirumee/saleor.git).
* Fork this for universal changes that can be PR'd upstream.
* No Enstaved-specific changes.
* Keep this up to date with upstream:

```
git checkout master
git fetch upstream
git merge upstream/master
```

* To start work on a new universal feature (use an issue # from mirumee/saleor):

```
git branch <#1234>-<my_new_feature> master
```

* If a feature is rejected upstream we should instead merge it into enstaved-master and keep master in sync with upstream.

### enstaved-master

* Enstaved shop master branch
* This is ready-to-deploy to shop.enstaved.com
* Fork this for enstaved-specific changes not to be PR'd upstream.
* Merge or cherry-pick from:
 * master
  * enstaved feature branch
   * Any "universal change" branches (even if still in progress or awaiting PR)
   * To start work on a new enstaved-specific feature (use an issue # from enstaved-shop):

   ```
   git branch <#1234>-<my_new_feature> enstaved-master
   ```
## Admin

### Add an admin user

`python manage.py createsuperuser`
