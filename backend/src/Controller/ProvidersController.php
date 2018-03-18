<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;

/**
 * Providers Controller
 *
 * @property \App\Model\Table\ProvidersTable $Providers
 *
 * @method \App\Model\Entity\Provider[] paginate($object = null, array $settings = [])
 */
class ProvidersController extends AppController
{

	/** @return array associated models */
	public function contain()
	{
		return [
			'Users',
			'Organisations'
		];
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter()
	{
		return [
			'Users.username',
			'Users.fullname',
			'Users.phone'
		];
	}

  public function getByUser()
	{
		$request = $this->request->input('json_decode');
		if (is_null($request) && !isset($request->user))
			return $this->ResponseHandler->responseError();

		$query = $this->table()->find()->contain($this->contain());
		if (isset($request->admin)) {
			$query->where([$this->name . '.admin' => $request->admin]);
		}
		$this->setByUser($query, $request);
		$result = $query
			->$query->where([$this->name . '.user_id' => $request->user])
			->all()
			->toArray();

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($result);

  }

	public function getByOrganisation()
	{
		$request = $this->request->input('json_decode');
		if (is_null($request) && !isset($request->organisation))
			return $this->ResponseHandler->responseError();

		if(isset($request->filter) || isset($request->sort)) {
			$query = $this->table()->find()
				->group($this->name . '.id')
				->where($this->getOrgaWhereClause($request));

			$this->setPagination($request);
			$this->setJoins($query);
			$this->setSorting($query, $request);
			$this->setFiltering($query, $request);
			$result = $this->paginate($query)->toArray();

			$response = $this->createListResponse($query, $result);
		} else {
			$response = $this->table()->find()
				->contain($this->contain())
				->where($this->getOrgaWhereClause($request))
				->all()
				->toArray();
		}

		return $this->ResponseHandler->isNotFoundError($response)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($this->createListResponse($query, $response));
	}

	private function getOrgaWhereClause($request)
	{
		return [$this->name . '.organisation_id' => $request->organisation];
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		switch ($this->request->getParam('action')) {
			case 'add':
				return $this->isOwnUserAndValid($user['id'], $request)
					|| $this->isOrgaAdminUser($user['id'], $request->organisation_id);
			case 'edit':
				return $this->isValidEditRequest($request) &&
					($this->isOwnProviderAndValid($user['id'], $request)
					|| $this->isOrgaAdminProvider($user['id'], $this->request->getParam('id')));
			case 'view':
			case 'delete':
				return $this->isOwnProvider($user['id'], $this->request->getParam('id'))
					|| $this->isOrgaAdminProvider($user['id'], $this->request->getParam('id'));
			case 'getByOrganisation':
				return $this->isOrgaAdminUser($user['id'], $request->organisation);
			case 'getByUser':
				return $user['id'] === $request->user;
			default:
				return parent::isAuthorized($user);
		}
	}

	private function isOwnUserAndValid($userId, $request)
	{
		return $userId === $request->user_id
			&& !$request->approved
			&& !$request->admin;
	}

	private function isOwnProvider($userId, $providerId)
	{
		$result = $this->getOwnProvider($userId,$providerId);
		return !empty($result);
	}

	private function isOwnProviderAndValid($userid, $request)
	{
		$ownProvider = $this->getOwnProvider($userid,$request->id);
		return (!empty($ownProvider) &&
			(!($request->approved && !$ownProvider->approved)
			|| !($request->admin && !$ownProvider->admin)));
	}

	private function isValidEditRequest($request)
	{
		if ($this->request->getParam('id') !== $request->id) return false;

		return $this->table()
			->exists([
				'id' => $request->id,
				'user_id' => $request->user_id
			]);
	}

	private function getOwnProvider($userId, $providerId)
	{
		return $this->table()->find()
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.id' => $providerId
			])
			->first();
	}
}
