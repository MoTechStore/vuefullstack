import graphene
from graphene_django.types import DjangoObjectType
from .models import Item


class ItemType(DjangoObjectType):
    class Meta:
        model = Item


class Query(graphene.ObjectType):
    items = graphene.List(ItemType)

    def resolve_items(self, info, **kwargs):
        return Item.objects.all()

class CreateItem(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        price = graphene.Decimal()

    item = graphene.Field(ItemType)

    def mutate(self, info, name, description, price):
        item = Item(name=name, description=description, price=price)
        item.save()
        return CreateItem(item=item)

class UpdateItem(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        price = graphene.Decimal()

    item = graphene.Field(ItemType)

    def mutate(self, info, id, name=None, description=None, price=None):
        try:
            item = Item.objects.get(pk=id)
        except Item.DoesNotExist:
            raise Exception("Item not found")

        if name is not None:
            item.name = name
        if description is not None:
            item.description = description
        if price is not None:
            item.price = price

        item.save()
        return UpdateItem(item=item)
    


class DeleteItem(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)  # ID of the item to delete

    success = graphene.Boolean()  # Return a boolean indicating success

    def mutate(self, info, id):
        try:
            item = Item.objects.get(pk=id)
            item.delete()
            return DeleteItem(success=True)
        except Item.DoesNotExist:
            raise Exception("Item not found")
        except Exception as e:
            raise Exception(f"An error occurred: {str(e)}")
        


class Mutation(graphene.ObjectType):
    create_item = CreateItem.Field()
    update_item = UpdateItem.Field()
    delete_item = DeleteItem.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)